import { useMemo } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/hooks/useTranslation";
import type { BusRoute } from "@/data/routes";

const ease = [0.2, 0.7, 0.2, 1] as const;

export default function Hero() {
  const { t, language } = useTranslation();
  const { data: routes = [] } = useQuery<BusRoute[]>({
    queryKey: ["/data/routes.json"],
  });

  const totalStops = routes.reduce((acc, r) => acc + (r.stops?.length ?? 0), 0);
  const totalDepartures = routes.reduce((acc, r) => {
    const out = r.schedules?.outbound?.times?.length ?? 0;
    const inb = r.schedules?.inbound?.times?.length ?? 0;
    return acc + out + inb;
  }, 0);

  const marqueeItems = useMemo(() => {
    const lines: string[] = [];
    routes.forEach((r) => {
      const times = r.schedules?.outbound?.times ?? [];
      times.slice(0, 4).forEach((t) => {
        lines.push(`${r.routeId} · ${t} · AIRPORT → ${(r.schedules?.outbound?.destination ?? "").toUpperCase()}`);
      });
    });
    if (lines.length === 0) {
      lines.push("PHUKET INTERNATIONAL AIRPORT · 100 ฿ MAX FARE · 3 ROUTES");
    }
    return lines;
  }, [routes]);

  return (
    <section className="relative bg-paper pt-24 md:pt-28 pb-12 md:pb-16 overflow-hidden">
      {/* Decorative gridlines */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0E0E0E 1px, transparent 1px), linear-gradient(to bottom, #0E0E0E 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top meta bar */}
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 mb-8 md:mb-12">
        <div className="flex flex-wrap items-end justify-between gap-y-3 border-b border-ink pb-3">
          <div className="font-mono-numerals text-[0.68rem] uppercase tracking-[0.32em] text-ink">
            Vol. 01 · Issue {String(new Date().getFullYear())} · Phuket / Thailand
          </div>
          <div className="font-mono-numerals text-[0.68rem] uppercase tracking-[0.32em] text-ink-mute">
            7.8804° N · 98.3923° E
          </div>
        </div>
      </div>

      {/* Editorial spread */}
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 grid grid-cols-12 gap-x-6 gap-y-8">
        {/* Left — display title */}
        <div className="col-span-12 lg:col-span-8 relative">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
                show: { opacity: 1, y: 0, filter: "blur(0)", transition: { duration: 0.9, ease } },
              }}
              className="font-mono-numerals text-[0.7rem] uppercase tracking-[0.34em] text-vermillion mb-4"
            >
              ⟶ A field guide to riding the island
            </motion.div>

            <h1 className="font-display text-ink leading-[0.86] tracking-[-0.02em]">
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0)", transition: { duration: 1.0, ease } },
                }}
                className="block text-[clamp(3.4rem,11vw,9.5rem)]"
              >
                Phuket,
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0)", transition: { duration: 1.0, ease } },
                }}
                className="block italic text-[clamp(3.4rem,11vw,9.5rem)] -mt-3 md:-mt-5"
              >
                by{" "}
                <span className="relative inline-block">
                  bus
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    viewBox="0 0 200 14"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 8 Q 50 1, 100 6 T 198 5"
                      stroke="#D5391C"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
                .
              </motion.span>
            </h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: 0.4 } },
              }}
              initial="hidden"
              animate="show"
              className="mt-7 max-w-xl text-ink-soft text-lg leading-snug text-balance"
            >
              {language === "th"
                ? "ตารางและสายรถสนามบินภูเก็ตทั้ง 3 เส้นทาง รวมป้ายหยุดและค่าโดยสาร — เก็บไว้ในกระเป๋าก่อนออกเดินทาง"
                : "Three airport routes, every stop, every departure. A small almanac for the long way home — clipped, current, and never a surprise fare."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="#detailed-schedules"
                className="group inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 rounded-sm font-mono-numerals text-xs uppercase tracking-[0.24em] hover:bg-vermillion transition-colors"
              >
                {t("hero.cta.schedules") || "View Schedules"}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">⟶</span>
              </a>
              <a
                href="#routes"
                className="inline-flex items-center gap-2 border border-ink text-ink px-5 py-3 rounded-sm font-mono-numerals text-xs uppercase tracking-[0.24em] hover:bg-ink hover:text-paper transition-colors"
              >
                {t("hero.cta.routes") || "Browse Routes"}
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Right — stat cartridge */}
        <motion.aside
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
          className="col-span-12 lg:col-span-4 lg:pl-6 lg:border-l lg:border-ink/30 self-end"
        >
          <div className="font-mono-numerals text-[0.68rem] uppercase tracking-[0.32em] text-ink-mute mb-3">
            ⟁ Today on the island
          </div>
          <dl className="grid grid-cols-3 lg:grid-cols-1 gap-4">
            <Stat label="Routes" value={routes.length || 3} />
            <Stat label="Stops" value={totalStops || 33} />
            <Stat label="Max fare" value="100฿" />
          </dl>

          <div className="mt-6 p-4 border border-ink/80 bg-paper-tint">
            <div className="font-mono-numerals text-[0.62rem] uppercase tracking-[0.28em] text-ink-mute">
              Daily departures
            </div>
            <div className="font-display text-5xl text-ink leading-none mt-2 tabular-nums">
              {totalDepartures || 100}
            </div>
            <div className="font-display italic text-ink-soft mt-1">
              little chances to catch the next bus.
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Marquee strip — departures ticker */}
      <div className="relative mt-12 md:mt-16">
        <div className="border-y border-ink bg-ink overflow-hidden">
          <div className="flex animate-marquee marquee-track py-3 whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((line, i) => (
              <span
                key={i}
                className="font-mono-numerals text-[0.78rem] uppercase tracking-[0.32em] text-paper px-6 flex items-center"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-vermillion mr-6" />
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="border-t border-ink pt-2">
      <div className="font-display text-4xl md:text-5xl text-ink leading-none tabular-nums">
        {value}
      </div>
      <div className="font-mono-numerals text-[0.62rem] uppercase tracking-[0.28em] text-ink-mute mt-1">
        {label}
      </div>
    </div>
  );
}
