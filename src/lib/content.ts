import { dict, fill, type Lang } from "./i18n";
import { duration, fareText, first, last, passesText, route, typicalRide } from "./routes";
import type { PageKey } from "./pages";
import type { QA } from "./seo";

type Vars = Record<string, string | number>;

const AIRPORT = "Phuket International Airport";
const P1_PATONG_OUT = "Patong Provincial Electricity Authority";
const P1_PATONG_IN = "Bangla Police Box Patong";

/** Every number a page's copy can mention, computed from routes.json so no language can drift. */
export function pageVars(key: PageKey, lang: Lang): Vars {
  const d = dict(lang);
  const p1 = route("P1"), p2 = route("P2"), p3 = route("P3"), p4 = route("P4"), p5 = route("P5");
  const dur = (m: number) => duration(m, lang);
  const ride = (from: string, to: string, dir: "outbound" | "inbound" = "outbound") => dur(typicalRide(p1, dir, from, to));
  const inRows = p1.stopTimes!.inbound;
  const bangla = inRows.stops.indexOf(P1_PATONG_IN);
  const firstBangla = inRows.rows.find((row) => row[bangla])!;

  const shared: Vars = {
    p1fare: fareText(p1, lang),
    p1time: ride(AIRPORT, P1_PATONG_OUT),
    p1last: last(p1, "outbound"),
    p4fare: fareText(p4, lang),
    p4time: dur(p4.durations!.outbound!["Patong Beach Bus Stop"]),
  };
  const times = (r: typeof p1): Vars => ({
    fare: fareText(r, lang),
    first: first(r, "outbound"),
    last: last(r, "outbound"),
    inFirst: first(r, "inbound"),
    inLast: last(r, "inbound"),
    boarding: (d.routes[r.id] as Record<string, string>).boarding,
  });

  switch (key) {
    case "P1":
      return {
        ...shared, ...times(p1),
        patong: shared.p1time,
        kata: ride(AIRPORT, "Kata Night Plaza"),
        rawai: ride(AIRPORT, "Rawai Beach"),
        kataFirst: inRows.rows[0][inRows.stops.indexOf("Kata Palm")]!,
        passes: passesText(p1, lang),
      };
    case "P2": {
      const f = p2.fare as { max: number; steps: number[] };
      return {
        ...shared, ...times(p2),
        duration: dur(p2.durations!.outbound!["Phuket Bus Terminal 1"]),
        max: f.max,
        steps: f.steps.map((n) => `${n}฿`).join(" / "),
      };
    }
    case "P3":
      return {
        ...shared, ...times(p3),
        fareNote: fill(d.routes.P3.fareUnconfirmed, { whatsapp: p3.whatsapp! }),
      };
    case "P4":
      return { ...shared, ...times(p4), duration: shared.p4time, passes: passesText(p4, lang) };
    case "P5":
      return { ...shared, ...times(p5), ...p5.frequency! };
    case "patong":
      return {
        ...shared,
        inTime: ride(P1_PATONG_IN, AIRPORT, "inbound"),
        inFirst: firstBangla[bangla]!,
        inFirstArr: firstBangla[inRows.stops.indexOf(AIRPORT)]!,
      };
    default:
      return shared;
  }
}

type PageCopy = { title: string; description: string; h1: string; intro: string; faq: QA[] };

export function pageCopy(key: Exclude<PageKey, "home">, lang: Lang): PageCopy & Record<string, unknown> {
  const raw = (dict(lang).pages as Record<string, PageCopy & Record<string, unknown>>)[key];
  const v = pageVars(key, lang);
  return {
    ...raw,
    title: fill(raw.title, v),
    description: fill(raw.description, v),
    h1: fill(raw.h1, v),
    intro: fill(raw.intro, v),
    faq: raw.faq.map((f) => ({ q: fill(f.q, v), a: fill(f.a, v) })),
  };
}

export const t = (s: string, key: PageKey, lang: Lang) => fill(s, pageVars(key, lang));

export { AIRPORT, P1_PATONG_IN, P1_PATONG_OUT };
