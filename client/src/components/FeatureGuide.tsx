import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HelpCircle, MapPin, Clock, Route, Smartphone, Navigation as NavIcon, CreditCard } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

type SectionKey = "stops" | "times" | "directions" | "mobile" | "payment";

const ICONS: Record<SectionKey, typeof MapPin> = {
  stops: MapPin,
  times: Clock,
  directions: Route,
  mobile: Smartphone,
  payment: CreditCard,
};

export default function HelpModal() {
  const { t } = useTranslation();

  const sections: SectionKey[] = ["stops", "times", "directions", "mobile", "payment"];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="hidden sm:inline-flex items-center gap-2 font-mono-numerals text-[0.7rem] uppercase tracking-[0.24em] text-ink hover:text-vermillion transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          {t("nav.help") || "Help"}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[82vh] overflow-y-auto bg-paper border border-ink/85 rounded-sm p-0">
        <div className="p-6 md:p-8">
          <DialogHeader>
            <div className="font-mono-numerals text-[0.62rem] uppercase tracking-[0.32em] text-vermillion mb-2">
              Field manual
            </div>
            <DialogTitle className="font-display text-3xl md:text-4xl text-ink leading-tight tracking-tight">
              <span className="italic">How</span> to read this paper.
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6 space-y-5">
            {sections.map((key, idx) => {
              const Icon = ICONS[key];
              const rawTitle = t(`help.${key}.title` as never);
              const rawDesc = t(`help.${key}.description` as never);
              const rawFeatures = t(`help.${key}.features` as never);
              const title = Array.isArray(rawTitle) ? rawTitle.join(" ") : rawTitle;
              const desc = Array.isArray(rawDesc) ? rawDesc.join(" ") : rawDesc;
              const features: string[] = Array.isArray(rawFeatures) ? rawFeatures : [];
              return (
                <div
                  key={key}
                  className="grid grid-cols-[44px_1fr] gap-4 border-t border-ink/20 pt-5 first:border-t-0 first:pt-0"
                >
                  <div className="w-11 h-11 grid place-items-center border border-ink rounded-sm bg-paper-tint text-ink">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono-numerals text-[0.6rem] uppercase tracking-[0.3em] text-ink-mute">
                      § {String(idx + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-display text-xl text-ink mt-1 leading-snug">
                      {title}
                    </h3>
                    <p className="text-ink-soft text-sm mt-1 leading-snug">{desc}</p>
                    {features.length > 0 && (
                      <ul className="mt-2 space-y-1 text-sm text-ink-soft">
                        {features.map((feature, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-vermillion">·</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-5 border-t border-ink/30 flex items-start gap-3 text-sm">
            <NavIcon className="w-4 h-4 mt-0.5 text-vermillion flex-shrink-0" />
            <div>
              <span className="font-mono-numerals text-[0.7rem] uppercase tracking-[0.28em] text-vermillion mr-2">
                {t("help.tip.title")}
              </span>
              <span className="text-ink-soft">{t("help.tip.description")}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
