import { SITE, dict, urlFor, type Lang } from "./i18n";
import type { Route } from "./routes";

export type QA = { q: string; a: string };
type LD = Record<string, unknown>;

export const breadcrumbLd = (lang: Lang, slug: string, name: string): LD => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: dict(lang).nav.home, item: urlFor(lang, "") },
    ...(slug ? [{ "@type": "ListItem", position: 2, name, item: urlFor(lang, slug) }] : []),
  ],
});

export const faqLd = (faq: QA[]): LD => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const webPageLd = (lang: Lang, slug: string, name: string, description: string, modified: string): LD => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${urlFor(lang, slug)}#webpage`,
  url: urlFor(lang, slug),
  name,
  description,
  inLanguage: lang === "zh" ? "zh-Hans" : lang,
  dateModified: modified,
  isPartOf: { "@id": `${SITE}/#website` },
});

export const websiteLd = (lang: Lang): LD => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: dict(lang).site.name,
  inLanguage: ["en", "th", "ru", "zh-Hans", "ko", "ja", "de", "fr"],
});

/** BusTrip per direction with real departure times. */
export function busTripLd(r: Route, lang: Lang, name: string): LD[] {
  return (["outbound", "inbound"] as const)
    .filter((k) => r.schedules[k])
    .map((k) => {
      const stops = k === "outbound" ? r.stops : (r.stopsInbound ?? [...r.stops].reverse());
      const stopLd = (i: number) => ({ "@type": "BusStop", name: lang === "th" ? stops[i].th : stops[i].en });
      return {
        "@context": "https://schema.org",
        "@type": "BusTrip",
        name: `${name} (${stops[0].en} → ${stops[stops.length - 1].en})`,
        busNumber: r.id,
        provider: { "@type": "Organization", name: r.operator },
        departureBusStop: stopLd(0),
        arrivalBusStop: stopLd(stops.length - 1),
        departureTime: r.schedules[k]!.times,
      };
    });
}
