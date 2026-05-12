import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, AlertTriangle, ExternalLink } from "lucide-react";
import { openGoogleMapsDirections } from "@/lib/googleMapsUtils";
import { useTranslation } from "@/hooks/useTranslation";
import type { BusRoute, BusStop } from "@/data/routes";

const ease = [0.2, 0.7, 0.2, 1] as const;

const ROUTE_COLOR: Record<string, string> = {
  P1: "#3A86FF",
  P2: "#D5391C",
  P3: "#1B2A5B",
};

const ROUTE_FB: Record<string, string> = {
  P1: "https://www.facebook.com/PhuketSmartBus",
  P2: "https://www.facebook.com/airportbusphuket/",
  P3: "https://www.facebook.com/Phuketbusexpress",
};

const SEARCH_MAP: Record<string, string> = {
  "Central Phuket": "Central Festival Phuket",
  "Lotus's Cherng Talay": "Lotus's Cherng Talay Phuket",
  "Lotus's": "Lotus's Phuket Kathu",
  "Big C Kamala": "Big C Kamala Phuket",
  "Karon Circle": "Karon Circle Phuket",
  "Kata Night Plaza": "Kata Night Plaza Phuket",
  "Surakul Stadium": "Surakul Stadium Phuket Town",
  "Rang Hill": "Khao Rang Hill Phuket",
  "Heroines Monument": "Heroines Monument Phuket",
  "Robinson Thalang": "Robinson Lifestyle Thalang Phuket",
  "Phuket Merlin Hotel": "Phuket Merlin Hotel",
  "Koh Kaew": "Koh Kaew Phuket",
  "Patong Provincial Electricity Authority": "Patong Provincial Electricity Authority Phuket",
};

const openMaps = (stop: string) => {
  const term = SEARCH_MAP[stop] ?? `${stop} Phuket`;
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(term)}`;
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "nofollow noopener noreferrer";
  a.click();
};

type Direction = "outbound" | "inbound";

export default function DetailedSchedules() {
  const { t, language } = useTranslation();
  const [dirs, setDirs] = useState<Record<string, Direction>>({});

  const { data: routes = [], isLoading } = useQuery<BusRoute[]>({
    queryKey: ["/data/routes.json"],
  });

  const setDir = (id: string, d: Direction) =>
    setDirs((prev) => ({ ...prev, [id]: d }));

  const buildSchemas = (route: BusRoute) => {
    const baseUrl = "https://phuketbusroutes.com";
    const schemas: Array<Record<string, unknown>> = [];

    const itinerary = (stops: BusStop[], reverse = false) =>
      (reverse ? [...stops].reverse() : stops).map((s) => ({
        "@type": "BusStop",
        name: language === "th" ? s.th : s.en,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Phuket",
          addressRegion: language === "th" ? "ภูเก็ต" : "Phuket",
          addressCountry: "TH",
        },
      }));

    (["outbound", "inbound"] as const).forEach((d) => {
      const sched = route.schedules?.[d];
      if (!sched?.available) return;
      const reverse = d === "inbound";
      const startStop = reverse
        ? route.stops[route.stops.length - 1]
        : route.stops[0];
      const endStop = reverse ? route.stops[0] : route.stops[route.stops.length - 1];
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BusTrip",
        "@id": `${baseUrl}/#route-${route.routeId}-${d}`,
        name:
          language === "th"
            ? `เส้นทาง ${route.routeId} (${reverse ? "ไปสนามบิน" : "จากสนามบิน"})`
            : `Route ${route.routeId} (${reverse ? "To Airport" : "From Airport"})`,
        description:
          language === "th" ? route.description?.th : route.description?.en,
        provider: {
          "@type": "Organization",
          name: language === "th" ? route.name?.th : route.name?.en,
        },
        busNumber: route.routeId,
        itinerary: {
          "@type": "ItemList",
          itemListElement: itinerary(route.stops, reverse),
        },
        departureBusStop: {
          "@type": "BusStop",
          name: language === "th" ? startStop?.th : startStop?.en,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Phuket",
            addressCountry: "TH",
          },
        },
        arrivalBusStop: {
          "@type": "BusStop",
          name: language === "th" ? endStop?.th : endStop?.en,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Phuket",
            addressCountry: "TH",
          },
        },
        departureTime: sched.times,
        offers: {
          "@type": "Offer",
          price: "100",
          priceCurrency: "THB",
          availability: "https://schema.org/InStock",
          description:
            language === "th"
              ? "ค่าโดยสารเหมาจ่าย สำหรับทุกเส้นทาง"
              : "Flat fare for all routes",
        },
      });
    });
    return schemas;
  };

  if (isLoading) {
    return (
      <section id="detailed-schedules" className="bg-paper-deep py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 space-y-10">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[420px] border border-ink/30 bg-paper-tint animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="detailed-schedules"
      className="relative bg-paper-deep py-16 md:py-24"
      data-section="detailed-schedules"
    >
      {/* Schema.org JSON-LD */}
      {routes.flatMap((r) =>
        buildSchemas(r).map((schema, i) => (
          <script
            key={`schema-${r.routeId}-${i}-${language}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))
      )}

      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-12 items-end mb-12 gap-y-4 border-b border-ink pb-5">
          <div className="col-span-12 md:col-span-7">
            <div className="font-mono-numerals text-[0.7rem] uppercase tracking-[0.32em] text-vermillion mb-3">
              § 02 · The timetable
            </div>
            <h2 className="font-display text-ink text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tight">
              When the buses{" "}
              <span className="italic">actually leave.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:text-right">
            <p className="text-ink-soft text-base max-w-md md:ml-auto leading-snug">
              {t("schedules.subtitle") ||
                "Tap any stop to open the map. Tap any time to plan the ride."}
            </p>
          </div>
        </div>

        <div className="space-y-16 md:space-y-20">
          {routes.map((route, rIdx) => {
            const color = ROUTE_COLOR[route.routeId] ?? "#0E0E0E";
            const dir = dirs[route.routeId] ?? "outbound";
            const sched = route.schedules?.[dir];
            const baseStops = route.stops as BusStop[];
            const stops =
              dir === "inbound"
                ? route.stopsInbound ?? [...baseStops].reverse()
                : baseStops;
            const fb = ROUTE_FB[route.routeId];
            const meta = route.meta;

            return (
              <motion.article
                key={route.routeId}
                data-route-id={route.routeId}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease, delay: rIdx * 0.06 }}
                className="relative bg-paper border border-ink/85 shadow-paper transition-shadow"
              >
                {/* Header strip */}
                <header
                  className="relative px-5 md:px-8 py-5 md:py-6 border-b border-ink/85 text-paper"
                  style={{ background: color }}
                >
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-baseline gap-4">
                      <div className="font-display text-5xl md:text-6xl leading-none">
                        {route.routeId}
                      </div>
                      <div>
                        <div className="font-display italic text-xl md:text-2xl leading-tight">
                          {language === "th" ? route.name?.th : route.name?.en}
                        </div>
                        <div className="font-mono-numerals text-[0.7rem] uppercase tracking-[0.28em] opacity-85 mt-1">
                          {language === "th"
                            ? route.description?.th
                            : route.description?.en}
                        </div>
                        {meta?.routeNumber && (
                          <div className="font-mono-numerals text-[0.6rem] uppercase tracking-[0.3em] opacity-75 mt-1">
                            · {meta.routeNumber}
                          </div>
                        )}
                      </div>
                    </div>
                    {fb ? (
                      <a
                        href={fb}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono-numerals text-[0.68rem] uppercase tracking-[0.24em] text-paper/90 hover:text-paper border border-paper/40 hover:border-paper px-3 py-1.5 rounded-sm transition-colors"
                        title="Follow for updates"
                      >
                        Updates
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : null}
                  </div>
                </header>

                {/* Body */}
                <div className="grid lg:grid-cols-12 gap-x-8 gap-y-10 p-5 md:p-8">
                  {/* Left — Route strip (Vignelli diagram) */}
                  <div className="lg:col-span-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-mono-numerals text-[0.7rem] uppercase tracking-[0.3em] text-ink-mute">
                        ⟁ Stops · {stops.length}
                      </h3>
                      <div className="font-mono-numerals text-[0.66rem] uppercase tracking-[0.28em] text-ink-mute">
                        {dir === "outbound" ? "Airport ⟶ Town" : "Town ⟶ Airport"}
                      </div>
                    </div>
                    <ol className="relative">
                      {/* Vertical line */}
                      <span
                        aria-hidden
                        className="absolute left-[14px] top-2 bottom-2 w-[2px]"
                        style={{ background: color }}
                      />
                      {stops.map((stop, idx) => (
                        <li key={`${dir}-${idx}-${stop.en}`} className="relative pl-12 py-2">
                          {/* Dot */}
                          <span
                            aria-hidden
                            className={`absolute left-[8px] top-[14px] w-[14px] h-[14px] rounded-full border-2 border-paper`}
                            style={{ background: color, boxShadow: `0 0 0 2px ${color}` }}
                          />
                          <button
                            type="button"
                            onClick={() => openMaps(stop.en)}
                            className="group flex items-start justify-between w-full text-left"
                            title={`Open ${stop.en} on Google Maps`}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono-numerals text-[0.62rem] text-ink-mute tabular-nums">
                                  {String(idx + 1).padStart(2, "0")}
                                </span>
                                <span className="text-ink font-medium group-hover:text-vermillion transition-colors">
                                  {language === "th" ? stop.th : stop.en}
                                </span>
                              </div>
                              <div className="text-xs text-ink-mute mt-0.5 ml-7">
                                {language === "th" ? stop.en : stop.th}
                              </div>
                            </div>
                            <span className="ml-3 mt-1 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1 font-mono-numerals text-[0.6rem] uppercase tracking-[0.24em] text-vermillion">
                              <MapPin className="w-3 h-3" />
                              Map
                            </span>
                          </button>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Right — Departure board */}
                  <div className="lg:col-span-7">
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                      <h3 className="font-mono-numerals text-[0.7rem] uppercase tracking-[0.3em] text-ink-mute">
                        ⟁ Departures
                      </h3>

                      {route.schedules?.inbound && (
                        <div className="inline-flex border border-ink rounded-sm overflow-hidden font-mono-numerals text-[0.68rem] uppercase tracking-[0.22em]">
                          <button
                            type="button"
                            onClick={() => setDir(route.routeId, "outbound")}
                            className={`px-3 py-1.5 transition-colors ${
                              dir === "outbound"
                                ? "bg-ink text-paper"
                                : "text-ink hover:bg-ink/10"
                            }`}
                          >
                            From Airport
                          </button>
                          <button
                            type="button"
                            onClick={() => setDir(route.routeId, "inbound")}
                            className={`px-3 py-1.5 transition-colors ${
                              dir === "inbound"
                                ? "bg-ink text-paper"
                                : "text-ink hover:bg-ink/10"
                            }`}
                          >
                            To Airport
                          </button>
                        </div>
                      )}
                    </div>

                    {sched?.available ? (
                      <>
                        <div className="flex items-center justify-between mb-3 font-mono-numerals text-[0.62rem] uppercase tracking-[0.28em] text-ink-mute">
                          <span>
                            From{" "}
                            <span className="text-ink">{sched.origin}</span>
                          </span>
                          <span>
                            ⟶ <span className="text-ink">{sched.destination}</span>
                          </span>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-0 border border-ink bg-ink">
                          {sched.times.map((time, i) => (
                            <motion.button
                              key={`${dir}-${time}-${i}`}
                              type="button"
                              onClick={() =>
                                openGoogleMapsDirections(route.routeId, dir, time)
                              }
                              initial={{ opacity: 0, y: 8 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.45,
                                ease,
                                delay: 0.02 * i,
                              }}
                              className="group relative bg-paper-tint hover:bg-vermillion hover:text-paper border-r border-b border-ink/30 py-3 px-2 font-mono-numerals text-lg md:text-xl text-ink tabular-nums tracking-tight transition-colors"
                              title={`Plan trip · ${time} · ${route.routeId}`}
                            >
                              {time}
                              <span className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ExternalLink className="w-2.5 h-2.5" />
                              </span>
                            </motion.button>
                          ))}
                        </div>

                        <div className="mt-3 font-mono-numerals text-[0.6rem] uppercase tracking-[0.28em] text-ink-mute">
                          {sched.times.length} departures · tap any time to plan
                        </div>
                      </>
                    ) : (
                      <div className="border border-dashed border-ink/40 bg-paper-tint p-6 text-center">
                        <AlertTriangle className="w-7 h-7 text-vermillion mx-auto mb-2" />
                        <div className="font-display italic text-lg text-ink">
                          Schedule not posted yet.
                        </div>
                        <div className="text-sm text-ink-mute mt-1">
                          We're still gathering the times for this direction.
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {meta && (
                  <footer className="border-t border-ink/85 bg-paper-tint px-5 md:px-8 py-4 grid grid-cols-12 gap-y-3 gap-x-6 text-ink">
                    {meta.payment && meta.payment.length > 0 && (
                      <div className="col-span-12 md:col-span-5">
                        <div className="font-mono-numerals text-[0.6rem] uppercase tracking-[0.3em] text-ink-mute">
                          Payment
                        </div>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {meta.payment.map((p) => (
                            <span
                              key={p}
                              className="font-mono-numerals text-[0.62rem] uppercase tracking-[0.18em] border border-ink/60 px-2 py-0.5 rounded-sm"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {meta.operator && (
                      <div className="col-span-12 md:col-span-4">
                        <div className="font-mono-numerals text-[0.6rem] uppercase tracking-[0.3em] text-ink-mute">
                          Operator
                        </div>
                        <div className="mt-1 text-sm">{meta.operator}</div>
                      </div>
                    )}
                    {meta.lastVerified && (
                      <div className="col-span-12 md:col-span-3 md:text-right">
                        <div className="font-mono-numerals text-[0.6rem] uppercase tracking-[0.3em] text-ink-mute">
                          Verified
                        </div>
                        <div className="mt-1 font-mono-numerals text-sm tabular-nums">
                          {meta.lastVerified}
                        </div>
                      </div>
                    )}
                  </footer>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
