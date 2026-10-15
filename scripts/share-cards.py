"""Draw the 1200x630 link-preview cards (og:image) into public/og/<page-key>.png.

Run locally after a route name or summary changes:  python3 scripts/share-cards.py
Needs Pillow and macOS system fonts. Cards carry names and places only, never times or
fares, so a card can't go stale when a timetable changes.
"""
import json
from pathlib import Path
from functools import lru_cache

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og"
en = json.loads((ROOT / "src/i18n/en.json").read_text())
routes = {r["id"]: r for r in json.loads((ROOT / "src/data/routes.json").read_text())}

W, H = 1200, 630
PAPER, INK, MUTE, VERMILLION = "#F3EDDF", "#0E0E0E", "#5C544A", "#B5301A"
F = "/System/Library/Fonts/"
serif = lru_cache(None)(lambda s: ImageFont.truetype(F + "Supplemental/Georgia.ttf", s))
serif_i = lambda s: ImageFont.truetype(F + "Supplemental/Georgia Italic.ttf", s)
sans = lambda s: ImageFont.truetype(F + "Supplemental/Arial.ttf", s)
arrow_font = lru_cache(None)(lambda s: ImageFont.truetype(F + "Supplemental/Times New Roman.ttf", s))
ARROWS = "→↔"
mono = lambda s: ImageFont.truetype(F + "Menlo.ttc", s)

R, H_ = en["routes"], en["home"]
TRIP = "Every departure, with arrival times"
# key: (headline, subline, stripe colour, badge)
CARDS = {
    "home": ("Phuket, by bus.", "All 5 routes: timetables, stops, fares, where to board", INK, "P1–P5"),
    **{rid: (R[rid]["name"], R[rid]["summary"], routes[rid]["color"], rid) for rid in routes},
    "airport": ("Phuket Airport bus", "Which bus to Patong, Kata, Rawai or Phuket Town", INK, "HKT"),
    "patong": (H_["tripAirportPatong"], "Smart Bus, Airport Express and the Town–Patong bus", routes["P1"]["color"], "P1"),
    "kataKaron": (H_["tripAirportKata"], TRIP, routes["P1"]["color"], "P1"),
    "rawai": (H_["tripAirportRawai"], TRIP, routes["P1"]["color"], "P1"),
    "kamalaSurin": (H_["tripAirportKamala"], TRIP, routes["P1"]["color"], "P1"),
    "town": (H_["tripAirportTown"], "Airport bus 8411, then the free Dragon Line", routes["P2"]["color"], "P2"),
    "map": ("Phuket bus map", "All 5 routes on one simple map", INK, "MAP"),
}


def runs(text, font, size):
    """Split text into (chunk, font) runs; Georgia has no arrow glyphs, so arrows use Times."""
    out = []
    for ch in text:
        f = arrow_font(size) if ch in ARROWS else font
        if out and out[-1][1] is f:
            out[-1][0] += ch
        else:
            out.append([ch, f])
    return out


def mixed_len(draw, text, font, size):
    return sum(draw.textlength(t, font=f) for t, f in runs(text, font, size))


def draw_mixed(draw, xy, text, font, size, fill):
    x, y = xy
    for t, f in runs(text, font, size):
        draw.text((x, y), t, font=f, fill=fill)
        x += draw.textlength(t, font=f)


def wrap(draw, text, font, width):
    """Greedy word wrap to fit `width` pixels."""
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if mixed_len(draw, trial, font, font.size) <= width or not line:
            line = trial
        else:
            lines.append(line)
            line = word
    return lines + [line]


def card(key, headline, sub, stripe, badge):
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)
    for x in range(0, W, 80):  # faint grid, like the site hero
        d.line([(x, 0), (x, H)], fill="#E6DFCF")
    for y in range(0, H, 80):
        d.line([(0, y), (W, y)], fill="#E6DFCF")
    d.rectangle([0, 0, 28, H], fill=stripe)
    d.text((80, 64), "PHUKET BUS ROUTES  ·  2026", font=mono(26), fill=VERMILLION)

    size = 104
    while True:  # shrink the headline until it fits in two lines
        lines = wrap(d, headline, serif(size), 820)
        orphan = len(lines) > 1 and len(lines[-1]) <= 3  # e.g. a lone "2"
        if (len(lines) <= 2 and not orphan) or size <= 64:
            break
        size -= 6
    y = 150
    for ln in lines:
        draw_mixed(d, (76, y), ln, serif(size), size, INK)
        y += int(size * 1.08)

    y += 22
    for ln in wrap(d, sub, sans(34), 880)[:2]:
        d.text((80, y), ln, font=sans(34), fill=MUTE)
        y += 46

    d.line([(80, H - 96), (W - 80, H - 96)], fill=INK, width=2)
    d.text((80, H - 74), "phuketbusroutes.com", font=mono(28), fill=INK)
    d.text((W - 80, H - 74), "8 languages", font=mono(28), fill=MUTE, anchor="ra")

    # Route badge, top right
    cx, cy, r = W - 160, 150, 86
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=stripe)
    light_badge = stripe in ("#F5B300", "#3A86FF")
    d.text((cx, cy), badge, font=serif_i(64 if len(badge) <= 3 else 44),
           fill=INK if light_badge else PAPER, anchor="mm")
    img.save(OUT / f"{key}.png", optimize=True)


OUT.mkdir(parents=True, exist_ok=True)
for key, args in CARDS.items():
    card(key, *args)
print(f"{len(CARDS)} cards → {OUT.relative_to(ROOT)}")
