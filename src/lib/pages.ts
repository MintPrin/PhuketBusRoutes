import type { Route } from "./routes";

export type PageKey = "home" | Route["id"] | "patong" | "map" | "airport" | TripKey | "town";
export type TripKey = "kataKaron" | "rawai" | "kamalaSurin";
export type Page = { key: PageKey; slug: string };

export const PAGES: Page[] = [
  { key: "home", slug: "" },
  { key: "P1", slug: "phuket-smart-bus" },
  { key: "P2", slug: "airport-bus-8411" },
  { key: "P3", slug: "phuket-airport-bus-express" },
  { key: "P4", slug: "smart-bus-town-patong" },
  { key: "P5", slug: "dragon-line-free-bus" },
  { key: "airport", slug: "phuket-airport-bus" },
  { key: "patong", slug: "patong-bus" },
  { key: "kataKaron", slug: "airport-to-kata-karon" },
  { key: "rawai", slug: "airport-to-rawai" },
  { key: "kamalaSurin", slug: "airport-to-kamala-surin" },
  { key: "town", slug: "airport-to-phuket-town" },
  { key: "map", slug: "phuket-bus-map" },
];

export const slugOf = (key: PageKey) => PAGES.find((p) => p.key === key)!.slug;
export const isTripKey = (key: PageKey): key is TripKey => key === "kataKaron" || key === "rawai" || key === "kamalaSurin";
export const isRouteKey = (key: PageKey): key is Route["id"] => /^P[1-5]$/.test(key);

/** P1 trip pages: which columns of the Smart Bus stop-time matrix each one shows (English stop names). */
export const TRIPS: Record<TripKey, { to: string[]; back: string[] }> = {
  kataKaron: { to: ["Karon Circle", "Kata Night Plaza"], back: ["Kata Night Plaza", "Karon Circle"] },
  rawai: { to: ["Rawai Beach"], back: ["Rawai Beach"] },
  kamalaSurin: { to: ["Surin Beach", "Kubor Kamala"], back: ["Kubor Kamala", "Surin Beach"] },
};
