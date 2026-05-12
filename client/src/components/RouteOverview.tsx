import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import type { BusRoute } from "@/data/routes";

const ease = [0.2, 0.7, 0.2, 1] as const;

const ROUTE_META: Record<
  string,
  { stripe: string; accentBg: string; accentText: string; nickname: string }
> = {
  P1: {
    stripe: "#3A86FF",
    accentBg: "bg-[#3A86FF]",
    accentText: "text-[#3A86FF]",
    nickname: "the beach line",
  },
  P2: {
    stripe: "#D5391C",
    accentBg: "bg-vermillion",
    accentText: "text-vermillion",
    nickname: "the town line",
  },
  P3: {
    stripe: "#1B2A5B",
    accentBg: "bg-[#1B2A5B]",
    accentText: "text-[#1B2A5B]",
    nickname: "the express",
  },
};

const scrollToRoute = (routeId: string) => {
  const target = document.querySelector(`[data-route-id="${routeId}"]`);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.pageYOffset - 100;
  window.scrollTo({ top, behavior: "smooth" });
  setTimeout(() => {
    target.classList.add("ring-4", "ring-vermillion/60");
    setTimeout(() => target.classList.remove("ring-4", "ring-vermillion/60"), 2200);
  }, 400);
};

export default function RouteOverview() {
  const { t, language } = useTranslation();
  const { data: routes = [], isLoading } = useQuery<BusRoute[]>({
    queryKey: ["/data/routes.json"],
  });

  return (
    <section id="routes" className="relative bg-paper py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-12 items-end mb-10 md:mb-14 gap-y-4">
          <div className="col-span-12 md:col-span-7">
            <div className="font-mono-numerals text-[0.7rem] uppercase tracking-[0.32em] text-vermillion mb-3">
              § 01 · The roster
            </div>
            <h2 className="font-display text-ink text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] tracking-tight">
              Three buses,{" "}
              <span className="italic">one island.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:text-right">
            <p className="text-ink-soft text-base md:text-lg max-w-md md:ml-auto leading-snug text-balance">
              {language === "th"
                ? "เลือกหมายเลขเส้นทางเพื่อดูป้ายและตารางเดินรถทั้งหมด"
                : t("routes.subtitle") || "Pick a number. Pull a card. See where it stops."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {isLoading
            ? [0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-[420px] border border-ink/30 bg-paper-tint animate-pulse"
                />
              ))
            : routes.map((route, idx) => {
                const meta = ROUTE_META[route.routeId] ?? ROUTE_META.P1;
                const outbound = route.schedules?.outbound;
                const firstTime = outbound?.times?.[0] ?? "--:--";
                const lastTime =
                  outbound?.times?.[outbound.times.length - 1] ?? "--:--";
                const stopCount = route.stops?.length ?? 0;

                return (
                  <motion.button
                    key={route.routeId}
                    type="button"
                    onClick={() => scrollToRoute(route.routeId)}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, ease, delay: idx * 0.12 }}
                    whileHover={{ y: -6, rotate: idx === 1 ? 0 : idx === 0 ? -0.6 : 0.6 }}
                    className="group relative text-left bg-paper-tint border border-ink/85 shadow-paper p-6 md:p-7 flex flex-col gap-5 overflow-hidden"
                    style={{
                      transform: `rotate(${idx === 1 ? "0deg" : idx === 0 ? "-1.2deg" : "1deg"})`,
                    }}
                  >
                    {/* Stripe */}
                    <div
                      className="absolute top-0 left-0 right-0 h-3"
                      style={{ background: meta.stripe }}
                    />

                    {/* Ticket pin */}
                    <div className="absolute top-5 right-5 w-3 h-3 rounded-full border border-ink bg-paper" />

                    <div className="flex items-start justify-between pt-3">
                      <div>
                        <div className="font-mono-numerals text-[0.62rem] uppercase tracking-[0.28em] text-ink-mute">
                          Route
                        </div>
                        <div className="font-display text-[6.5rem] md:text-[7.5rem] leading-[0.78] text-ink tracking-tight">
                          {route.routeId}
                        </div>
                      </div>
                      <div className="text-right pt-2">
                        <div className="font-mono-numerals text-[0.6rem] uppercase tracking-[0.28em] text-ink-mute">
                          Stops
                        </div>
                        <div className="font-display text-4xl text-ink leading-none">
                          {stopCount}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-ink/20 pt-4">
                      <div className={`font-display italic text-xl ${meta.accentText}`}>
                        {meta.nickname}
                      </div>
                      <div className="mt-1 text-ink text-base font-medium leading-snug">
                        {language === "th"
                          ? route.name?.th
                          : route.name?.en}
                      </div>
                      <div className="mt-2 text-ink-mute text-sm leading-snug">
                        {language === "th"
                          ? route.description?.th
                          : route.description?.en}
                      </div>
                    </div>

                    <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-dashed border-ink/40">
                      <div>
                        <div className="font-mono-numerals text-[0.58rem] uppercase tracking-[0.28em] text-ink-mute">
                          {t("schedule.first") || "First"}
                        </div>
                        <div className="font-mono-numerals text-2xl text-ink tabular-nums mt-1">
                          {firstTime}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono-numerals text-[0.58rem] uppercase tracking-[0.28em] text-ink-mute">
                          {t("schedule.last") || "Last"}
                        </div>
                        <div className="font-mono-numerals text-2xl text-ink tabular-nums mt-1">
                          {lastTime}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 inline-flex items-center gap-2 font-mono-numerals text-[0.68rem] uppercase tracking-[0.28em] text-ink group-hover:text-vermillion transition-colors">
                      Open timetable
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">⟶</span>
                    </div>
                  </motion.button>
                );
              })}
        </div>
      </div>
    </section>
  );
}
