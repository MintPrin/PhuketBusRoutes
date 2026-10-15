# PhuketBusRoutes — Claude Project Guide

## Project
Static guide to Phuket public buses at `phuketbusroutes.com`, in 8 languages (en, th, ru, zh, ko, ja, de, fr). Five routes: P1 Smart Bus (airport–Rawai), P2 airport bus 8411 (airport–Town), P3 Airport Bus Express (airport–Kata), P4 Smart Bus Route 2 (Town–Patong), P5 free Dragon Line (Old Town loop). Hosted on **Vercel**.

Every route and trip has its own indexable URL. Before October 2026 the site was a React SPA where everything lived on `/`; it was rebuilt in Astro so search engines and AI crawlers get real HTML.

## Stack
- **Astro 5** static build (`output: static`, `build.format: file`), no integrations
- **Tailwind CSS v3** via PostCSS (`tailwind.config.mjs`, `postcss.config.js`)
- No React, no client framework. Two tiny inline scripts: nav clock and the timetable direction toggle.
- Output: `dist/` (gitignored)

## Layout
```
src/
├── data/routes.json        # Single source of truth for facts: stops, times, fares, passes, boarding flags
├── i18n/<lang>.json        # All copy. en.json is the source; others must match its keys/placeholders/numbers
├── lib/
│   ├── i18n.ts             # LANGS, dict(), fill(), pathFor()/urlFor()
│   ├── routes.ts           # Route type + helpers (fareText, duration, typicalRide, legRows)
│   ├── content.ts          # pageVars(): every number a page's copy mentions, computed from routes.json
│   ├── pages.ts            # Page list + slugs
│   └── seo.ts              # JSON-LD builders (WebPage, BreadcrumbList, FAQPage, BusTrip)
├── components/             # Nav, Footer, Timetable, StopTimes, Faq, BusMap, Related, PageHead
│   └── pages/              # Home, RoutePage, AirportPage, TripPage, TownPage, PatongPage, MapPage
├── layouts/Base.astro      # <head>: title, description, canonical, hreflang x8 + x-default, GA4
└── pages/
    ├── [...path].astro     # Generates every language × page (13 pages × 8 = 104)
    ├── 404.astro
    ├── sitemap.xml.ts      # Sitemap with hreflang alternates
    └── llms.txt.ts         # /llms.txt for AI assistants, built from routes.json + en.json
scripts/check-i18n.mjs      # Runs before every build; fails on key/placeholder/number drift
scripts/indexnow.mjs        # After a deploy: pings Bing/Yandex/Naver with every sitemap URL (key file in public/)
public/                     # favicons, robots.txt, site.webmanifest
vercel.json                 # framework astro, cleanUrls, host redirects
```

URLs: English at `/`, `/phuket-smart-bus`; other languages prefixed: `/th`, `/th/phuket-smart-bus`.

Pages: home, 5 route pages, airport hub (`/phuket-airport-bus`), trip pages (`/patong-bus`, `/airport-to-kata-karon`, `/airport-to-rawai`, `/airport-to-kamala-surin`, `/airport-to-phuket-town`), bus map. Smart Bus trip pages read arrival times from the P1 `stopTimes` matrix via `TRIPS` in `lib/pages.ts`.

## Data rules (accuracy is the product)
- Facts live only in `src/data/routes.json`. Copy pulls numbers in through `{placeholders}` filled by `lib/content.ts`, so a timetable change updates all 8 languages at once.
- Never invent a time, fare or stop. If a fact is unverified, flag it (see P3 `fareUnconfirmed`, P2 `lastBusConflict`) instead of guessing.
- Operator Facebook pages are the real source; official sites lag (P3's site now redirects to ads). The P1 `stopTimes` matrix is transcribed from the operator's "Start 16 January 2026" timetable images.
- After a data check, update `lastVerified` on the route.

## Copy rules
- `en.json` is the source. Edit it first, then mirror the change in every other language file.
- `npm run check:i18n` must pass: same keys, same placeholders, same digits as English. Write numbers in other languages as digits only where English has them.
- Thai is held to the same bar as English; never translate Thai literally from English.

## Hard restrictions
- **NEVER** edit `dist/**` — generated output
- **NEVER** reintroduce a server or real API endpoints — static-only on Vercel
- **NEVER** invoke Replit-specific commands or flows

## Dev commands
```bash
npm install
npm run dev          # Astro dev server
npm run build        # i18n check + astro build → dist/
npm run preview      # Serve dist/ locally
npm run check:i18n   # Translation drift check only
npm run indexnow     # After deploy to main: notify Bing/Yandex/Naver of all URLs
```

## Deployment
- **Prod**: Vercel auto-deploys on push to `main`. Live-site changes go on a branch first; check the Vercel preview, then merge.
- **Domain**: `phuketbusroutes.com` (Namecheap DNS → Vercel); `www` and `phuketbusroutes.mintprin.com` 301 to the apex via `vercel.json`
- **Analytics**: GA4 `G-ZFXLE1TQXE` (property 490613933); Search Console domain property `sc-domain:phuketbusroutes.com`

## History
- 2025: Replit Express + Vite app; `replit.md` kept as backstory
- 2026-05-11: moved to Vercel as a static React SPA
- 2026-10-15: `/th` had returned 404 since the Vercel move (rewrite never matched under `cleanUrls`); fixed, then rebuilt in Astro with per-route pages and 8 languages

## Workflow preferences (from owner)
- Simple, direct language
- Ask before adding new external deps or reintroducing a backend
- Mobile-first design preserved
