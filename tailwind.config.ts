import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        thai: ['"IBM Plex Sans Thai"', '"Bai Jamjuree"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Custom editorial palette
        paper: {
          DEFAULT: "#F3EDDF",
          deep: "#E9DEC6",
          tint: "#FAF6EC",
        },
        ink: {
          DEFAULT: "#0E0E0E",
          soft: "#2A2724",
          mute: "#5C544A",
        },
        vermillion: "#D5391C",
        signal: "#F5C24D",
        sand: "#B8956A",
        "teal-deep": "#0F5E5A",
        "route-p1": "#3A86FF",
        "route-p2": "#D5391C",
        "route-p3": "#1B2A5B",
      },
      boxShadow: {
        paper: "0 1px 0 0 rgba(14,14,14,0.08), 0 12px 30px -18px rgba(14,14,14,0.35)",
        stamp: "0 0 0 1px #0E0E0E, 4px 4px 0 0 #0E0E0E",
        ticket: "0 0 0 1px rgba(14,14,14,0.85)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        flip: {
          "0%": { transform: "rotateX(0deg)", opacity: "0.4" },
          "50%": { transform: "rotateX(90deg)", opacity: "0" },
          "100%": { transform: "rotateX(0deg)", opacity: "1" },
        },
        riseIn: {
          "0%": { transform: "translateY(28px)", opacity: "0", filter: "blur(8px)" },
          "100%": { transform: "translateY(0)", opacity: "1", filter: "blur(0)" },
        },
        drawLine: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        ticker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 38s linear infinite",
        flip: "flip 0.6s ease-out",
        "rise-in": "riseIn 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) forwards",
        "draw-line": "drawLine 1.6s ease-out forwards",
        ticker: "ticker 1.6s ease-in-out infinite",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
