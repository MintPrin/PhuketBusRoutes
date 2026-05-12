import { useTranslation } from "@/hooks/useTranslation";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-ink text-paper overflow-hidden">
      {/* Big italic mast */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 pt-16 pb-10 grid grid-cols-12 gap-y-10 gap-x-6">
        <div className="col-span-12 md:col-span-7">
          <div className="font-display italic text-[clamp(3.5rem,12vw,9rem)] leading-[0.84] tracking-tight text-paper">
            Catch
            <br />
            the bus.
          </div>
          <div className="mt-6 max-w-md text-paper/70 text-sm leading-snug">
            {t("footer.description") ||
              "A quiet field guide to Phuket's airport buses — routes, stops, fares — kept current by hand."}
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 md:pl-6 md:border-l md:border-paper/15">
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <div className="font-mono-numerals text-[0.62rem] uppercase tracking-[0.3em] text-paper/50">
                ⟁ Routes
              </div>
              <ul className="mt-2 space-y-1 font-mono-numerals text-sm text-paper">
                <li>P1 · The beach line</li>
                <li>P2 · The town line</li>
                <li>P3 · The express</li>
              </ul>
            </div>
            <div>
              <div className="font-mono-numerals text-[0.62rem] uppercase tracking-[0.3em] text-paper/50">
                ⟁ Notes
              </div>
              <ul className="mt-2 space-y-1 text-sm text-paper/85">
                <li>Cash only · max 100฿</li>
                <li>Luggage rides free</li>
                <li>Arrive 5–10 min early</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 font-mono-numerals text-[0.62rem] uppercase tracking-[0.3em] text-paper/45">
            ✶ Filed under: transit · island life · ฿100
          </div>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-5 flex flex-wrap items-center justify-between gap-3 font-mono-numerals text-[0.62rem] uppercase tracking-[0.3em] text-paper/55">
          <span>© {new Date().getFullYear()} Phuket Bus Routes</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-vermillion animate-ticker" />
            Set in Instrument Serif &amp; JetBrains Mono
          </span>
        </div>
      </div>
    </footer>
  );
}
