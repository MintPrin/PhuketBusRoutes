/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,ts,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "-apple-system", "sans-serif"],
        display: ['"Instrument Serif"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        paper: { DEFAULT: "#F3EDDF", deep: "#E9DEC6", tint: "#FAF6EC" },
        ink: { DEFAULT: "#0E0E0E", soft: "#2A2724", mute: "#5C544A" },
        vermillion: "#D5391C",
      },
      boxShadow: {
        paper: "0 1px 0 0 rgba(14,14,14,0.08), 0 12px 30px -18px rgba(14,14,14,0.35)",
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        riseIn: {
          "0%": { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        ticker: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.45" } },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "rise-in": "riseIn 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        ticker: "ticker 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
