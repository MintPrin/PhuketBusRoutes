import data from "../data/routes.json";
import { dict, fill, type Lang } from "./i18n";

export type Stop = { en: string; th: string };
type Fare =
  | { type: "flat"; amount: number }
  | { type: "distance"; min: number; max: number; steps: number[] }
  | { type: "free" }
  | { type: "unconfirmed" };
type Dir = "outbound" | "inbound";

export type Route = {
  id: "P1" | "P2" | "P3" | "P4" | "P5";
  slug: string;
  color: string;
  stops: Stop[];
  stopsInbound?: Stop[];
  schedules: { outbound?: { times: string[] }; inbound?: { times: string[] } };
  routeNumber: string;
  operator: string;
  lastVerified: string;
  sources: string[];
  facebook?: string;
  website?: string;
  whatsapp?: string;
  fare: Fare;
  childFree?: number;
  payment: string[];
  dayPasses?: { days: number; price: number }[];
  stopTimes?: Record<Dir, { stops: string[]; rows: (string | null)[][] }>;
  durations?: { outbound?: Record<string, number>; inbound?: Record<string, number> };
  frequency?: { every: number; start: string; end: string };
  airport?: boolean;
  flags?: string[];
};

export const ROUTES = data as Route[];
export const route = (id: Route["id"]) => ROUTES.find((r) => r.id === id)!;

export const stopName = (s: Stop, lang: Lang) => (lang === "th" ? s.th : s.en);
export const stopAlt = (s: Stop, lang: Lang) => (lang === "th" ? s.en : s.th);
export const findStop = (r: Route, en: string): Stop =>
  [...r.stops, ...(r.stopsInbound ?? [])].find((s) => s.en === en) ?? { en, th: en };
export const inboundStops = (r: Route) => r.stopsInbound ?? [...r.stops].reverse();

export function duration(min: number, lang: Lang): string {
  const ui = dict(lang).ui;
  if (min < 60) return fill(ui.minutes, { n: min });
  if (min % 60 === 0) return fill(ui.hoursOnly, { h: min / 60 });
  return fill(ui.hoursMinutes, { h: Math.floor(min / 60), m: min % 60 });
}

export function fareText(r: Route, lang: Lang): string {
  const ui = dict(lang).ui;
  const f = r.fare;
  if (f.type === "flat") return fill(ui.flatFare, { amount: f.amount });
  if (f.type === "distance") return fill(ui.distanceFare, { min: f.min, max: f.max });
  if (f.type === "free") return ui.free;
  return ui.fareUnknown;
}

export const passesText = (r: Route, lang: Lang) =>
  (r.dayPasses ?? []).map((p) => fill(dict(lang).ui.dayPass, p)).join(" · ");

export const first = (r: Route, d: Dir) => r.schedules[d]?.times[0] ?? "";
export const last = (r: Route, d: Dir) => r.schedules[d]?.times.at(-1) ?? "";

/** Minutes between two HH:MM, wrapping past midnight. */
export function gap(a: string, b: string): number {
  const m = (t: string) => +t.slice(0, 2) * 60 + +t.slice(3);
  return (m(b) - m(a) + 1440) % 1440;
}

/** Most common ride time between two columns of a stop-time matrix. */
export function typicalRide(r: Route, d: Dir, from: string, to: string): number {
  const st = r.stopTimes![d];
  const a = st.stops.indexOf(from);
  const b = st.stops.indexOf(to);
  if (a < 0 || b < 0) throw new Error(`Unknown stop ${from} or ${to} on ${r.id}`);
  const counts = new Map<number, number>();
  for (const row of st.rows) {
    if (!row[a] || !row[b]) continue;
    const g = gap(row[a]!, row[b]!);
    counts.set(g, (counts.get(g) ?? 0) + 1);
  }
  return [...counts.entries()].sort((x, y) => y[1] - x[1])[0][0];
}

/** Rows of [leave, arrive] between two columns, skipping rows that miss either stop. */
export function legRows(r: Route, d: Dir, from: string, to: string): [string, string][] {
  const st = r.stopTimes![d];
  const a = st.stops.indexOf(from);
  const b = st.stops.indexOf(to);
  return st.rows.filter((row) => row[a] && row[b]).map((row) => [row[a]!, row[b]!]);
}

export const totalDepartures = () =>
  ROUTES.reduce((n, r) => n + (r.schedules.outbound?.times.length ?? 0) + (r.schedules.inbound?.times.length ?? 0), 0);

export const totalStops = () => ROUTES.reduce((n, r) => n + r.stops.length, 0);

export const mapsUrl = (s: Stop) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.en}, Phuket`)}`;
