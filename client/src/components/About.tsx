import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const ease = [0.2, 0.7, 0.2, 1] as const;

export default function About() {
  const { t } = useTranslation();

  return (
    <section data-section="about" className="relative bg-paper-deep py-16 md:py-24">
      <div className="max-w-[1100px] mx-auto px-5 md:px-8 grid grid-cols-12 gap-y-8 gap-x-8">
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono-numerals text-[0.7rem] uppercase tracking-[0.32em] text-vermillion mb-3">
            § 04 · Colophon
          </div>
          <div className="font-display text-ink text-4xl leading-[0.95] tracking-tight">
            {t("about.title") || "About"}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="col-span-12 md:col-span-8"
        >
          <p className="font-display text-2xl md:text-3xl text-ink leading-snug italic">
            “{t("about.description") ||
              "Schedules collected by hand from terminal posters, Facebook updates, and the lonely official site that still exists."}”
          </p>

          <div className="mt-6 font-mono-numerals text-[0.7rem] uppercase tracking-[0.32em] text-ink-mute">
            Sources
          </div>
          <div className="mt-2 text-ink-soft text-base leading-snug">
            {t("about.sources") ||
              "Terminal posters · Facebook pages · The rarely updated official site (which still exists)"}
          </div>

          <div className="mt-8 pt-6 border-t border-ink/30 flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="font-mono-numerals text-[0.7rem] uppercase tracking-[0.32em] text-ink-mute">
                {t("about.feedback.title") || "Feedback"}
              </div>
              <div className="text-ink-soft italic mt-1">
                {t("about.feedback.description") || "Form coming soon — bear with us."}
              </div>
            </div>
            <div className="font-mono-numerals text-[0.62rem] uppercase tracking-[0.28em] text-ink-mute">
              hand-set · 2026
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
