import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { getLocalizedPath, removeLanguagePrefix } from "@/i18n";
import HelpModal from "@/components/FeatureGuide";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { language } = useTranslation();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const switchLanguage = (next: "en" | "th") => {
    const currentPath = removeLanguagePrefix(location);
    window.location.href = getLocalizedPath(currentPath, next);
  };

  const timeStr = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-paper/95 backdrop-blur-md border-b border-ink/15 py-2"
          : "bg-paper py-3"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 flex items-center justify-between gap-4">
        {/* Wordmark — stacked editorial */}
        <a href={language === "th" ? "/th/" : "/"} className="group flex items-center gap-3">
          <div className="relative w-9 h-9 grid place-items-center bg-ink text-paper rounded-sm">
            <span className="font-display italic text-xl leading-none">P</span>
            <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-vermillion rounded-full" />
          </div>
          <div className="leading-[0.95]">
            <div className="font-display italic text-[1.35rem] text-ink tracking-tight">
              Phuket<span className="text-vermillion">.</span>
            </div>
            <div className="font-mono-numerals text-[0.62rem] uppercase tracking-[0.28em] text-ink-mute">
              Bus / Routes / Index
            </div>
          </div>
        </a>

        {/* Right meta cluster */}
        <div className="flex items-center gap-3 md:gap-5">
          <div className="hidden md:flex items-center gap-2 font-mono-numerals text-xs uppercase tracking-[0.18em] text-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-vermillion animate-ticker" />
            <span>LIVE {timeStr} ICT</span>
          </div>

          <div className="hidden sm:block w-px h-6 bg-ink/20" />

          <HelpModal />

          {/* EN / TH switch as a hard toggle */}
          <div className="flex items-center font-mono-numerals text-[0.7rem] uppercase tracking-[0.22em] border border-ink rounded-sm overflow-hidden">
            <button
              onClick={() => switchLanguage("en")}
              className={`px-2.5 py-1.5 transition-colors ${
                language === "en"
                  ? "bg-ink text-paper"
                  : "bg-transparent text-ink hover:bg-ink/10"
              }`}
              aria-pressed={language === "en"}
            >
              EN
            </button>
            <button
              onClick={() => switchLanguage("th")}
              className={`px-2.5 py-1.5 transition-colors ${
                language === "th"
                  ? "bg-ink text-paper"
                  : "bg-transparent text-ink hover:bg-ink/10"
              }`}
              aria-pressed={language === "th"}
            >
              TH
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
