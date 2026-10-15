# Phuket Bus Routes

Independent guide to Phuket's public buses: timetables, stops, fares and where to board, in 8 languages.

**Live:** [phuketbusroutes.com](https://phuketbusroutes.com)

## Routes

| | Route | Fare |
|---|---|---|
| P1 | Phuket Smart Bus: Airport → Surin → Kamala → Patong → Karon → Kata → Rawai | 100฿ flat |
| P2 | Airport Bus 8411: Airport → Central Phuket → Phuket Town → Bus Terminal 1 | 30–100฿ by distance |
| P3 | Airport Bus Express: Airport → Kathu → Patong → Karon → Kata | Unconfirmed |
| P4 | Smart Bus Route 2: Bus Terminal 1 → Kathu → Patong | 50฿ flat |
| P5 | Dragon Line: free loop around Phuket Old Town | Free |

## Quick start

```bash
npm install
npm run dev
```

`npm run build` checks the translations against English, then builds the static site into `dist/`.

## How it's built

- [Astro](https://astro.build) static site, Tailwind CSS, no client framework
- Facts in `src/data/routes.json`, copy in `src/i18n/<lang>.json`
- Languages: English, Thai, Russian, Simplified Chinese, Korean, Japanese, German, French

See `CLAUDE.md` for the full layout and data rules.
