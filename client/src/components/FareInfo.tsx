import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const ease = [0.2, 0.7, 0.2, 1] as const;

export default function FareInfo() {
  const { t } = useTranslation();

  const txt = (k: Parameters<typeof t>[0], fb: string): string => {
    const v = t(k);
    return Array.isArray(v) ? v.join(" ") : v || fb;
  };

  const tickets = [
    {
      key: "fare",
      label: txt("fare.pricing.title", "Distance Pricing"),
      value: txt("fare.pricing.amount", "100฿"),
      caption: txt("fare.pricing.description", "Fare varies by distance"),
      stamp: "TARIFF",
    },
    {
      key: "pay",
      label: txt("fare.payment.title", "Payment"),
      value: "Cash + QR",
      caption:
        "Pay the uniformed staff. PromptPay/QR works on all three routes. Smart Bus (P1) also accepts Mastercard / Visa contactless + Rabbit Card.",
      stamp: "BAHT",
    },
    {
      key: "bag",
      label: txt("fare.luggage.title", "Luggage"),
      value: txt("fare.luggage.cost", "Free"),
      caption: txt("fare.luggage.description", "Standard bags allowed"),
      stamp: "GRATIS",
    },
  ];

  return (
    <section className="relative bg-paper py-16 md:py-24 overflow-hidden">
      {/* Big italic ghost word */}
      <div
        aria-hidden
        className="absolute -top-6 left-0 right-0 font-display italic text-[18vw] leading-none text-ink/[0.04] whitespace-nowrap text-center pointer-events-none select-none"
      >
        one hundred baht
      </div>

      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-12 items-end mb-12 gap-y-4">
          <div className="col-span-12 md:col-span-7">
            <div className="font-mono-numerals text-[0.7rem] uppercase tracking-[0.32em] text-vermillion mb-3">
              § 03 · The fare
            </div>
            <h2 className="font-display text-ink text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tight">
              No haggling.{" "}
              <span className="italic">Just bahts.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:text-right">
            <p className="text-ink-soft text-base max-w-md md:ml-auto leading-snug">
              {t("fare.subtitle") || "A flat ceiling, cash to the driver, and your suitcase rides free."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tickets.map((ticket, i) => (
            <motion.div
              key={ticket.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              className="relative bg-paper-tint border border-ink/85 shadow-paper p-6 md:p-7 flex flex-col"
            >
              {/* Perforated edge */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 pointer-events-none">
                <span className="w-3 h-3 rounded-full bg-paper border border-ink/85 -ml-4" />
                <span className="w-3 h-3 rounded-full bg-paper border border-ink/85 -mr-4" />
              </div>

              <div className="font-mono-numerals text-[0.62rem] uppercase tracking-[0.3em] text-ink-mute mb-2 flex items-center justify-between">
                <span>No. {String(i + 1).padStart(3, "0")}</span>
                <span>{ticket.label.toUpperCase()}</span>
              </div>

              <div className="font-display text-[clamp(2.6rem,5vw,4rem)] text-ink leading-[0.9] tracking-tight">
                {ticket.value}
              </div>

              <div className="mt-3 text-ink-soft leading-snug">
                {ticket.caption}
              </div>

              {/* Stamp */}
              <div className="mt-6 self-end">
                <div className="inline-block border-2 border-vermillion text-vermillion px-3 py-1.5 font-mono-numerals text-[0.62rem] uppercase tracking-[0.34em] -rotate-6">
                  ✦ {ticket.stamp}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
