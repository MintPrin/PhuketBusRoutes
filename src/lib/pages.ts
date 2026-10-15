import type { Route } from "./routes";

export type PageKey = "home" | Route["id"] | "patong" | "map";
export type Page = { key: PageKey; slug: string };

export const PAGES: Page[] = [
  { key: "home", slug: "" },
  { key: "P1", slug: "phuket-smart-bus" },
  { key: "P2", slug: "airport-bus-8411" },
  { key: "P3", slug: "phuket-airport-bus-express" },
  { key: "P4", slug: "smart-bus-town-patong" },
  { key: "P5", slug: "dragon-line-free-bus" },
  { key: "patong", slug: "patong-bus" },
  { key: "map", slug: "phuket-bus-map" },
];

export const slugOf = (key: PageKey) => PAGES.find((p) => p.key === key)!.slug;
export const isRouteKey = (key: PageKey): key is Route["id"] => /^P[1-5]$/.test(key);
