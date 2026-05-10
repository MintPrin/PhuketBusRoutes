# PhuketBusRoutes — Claude Project Guide

## Project
Bilingual TH/EN single-page app at `phuketbusroutes.com`. Static reference for 3 Phuket airport bus routes (P1/P2/P3): stops, schedules, fares. Hosted on **Vercel** (migrated from Replit 2026-05-11, full-stack → static).

## Stack
- **Framework**: React 18 + TypeScript + Vite 5 (SPA)
- **Routing**: Wouter (client-side)
- **Data fetching**: TanStack Query (against static `/data/routes.json`)
- **UI**: shadcn/ui + Radix primitives + Tailwind CSS v3 + framer-motion
- **i18n**: `react-i18next` (assumed via `useTranslation` calls)
- **Output**: `dist/` (gitignored) — static assets only

## Layout
```
client/
├── index.html              # Vite entry
├── public/                 # Static assets served as-is
│   ├── data/routes.json    # Bus route data (formerly /api/routes)
│   ├── _redirects          # Static-host redirect rules (legacy)
│   ├── sitemap.xml, robots.txt, favicons
│   └── ...
└── src/
    ├── components/         # Including RouteOverview, DetailedSchedules, FareInfo
    ├── data/routes.ts      # TypeScript types (BusRoute, BusStop, BusSchedule)
    ├── lib/queryClient.ts  # TanStack Query default fetch by queryKey[0]
    └── ...
attached_assets/            # Image assets, importable via @assets alias
postcss.config.js           # Tailwind v3 + autoprefixer
tailwind.config.ts          # Tailwind config
vite.config.ts              # outDir = ./dist, root = ./client
vercel.json                 # SPA rewrites + 301 redirects
```

## Hard restrictions
- **NEVER** edit `dist/**` — generated output
- **NEVER** reintroduce server (`server/`, `shared/`, Express, Drizzle, Neon) — site is static-only on Vercel
- **NEVER** invoke Replit-specific commands or flows — Vercel is canonical
- **NEVER** add real API endpoints — if dynamic data needed, switch to Vercel Functions deliberately

## Data flow
- App startup → TanStack Query fetches `/data/routes.json` via default queryFn
- `routes.json` is the single source of truth for route content
- To change schedules/stops/fares: edit `client/public/data/routes.json` directly

## Dev commands
```bash
npm install
npm run dev       # Vite dev server (default port 5173)
npm run build     # Vite production build → dist/
npm run preview   # Serve dist/ locally
npm run check     # tsc type check
```

## Deployment
- **Prod**: Vercel auto-deploys on push to `main`
- **Build**: `npm run build` (Vite default detection)
- **Output dir**: `dist`
- **Domain**: `phuketbusroutes.com` (NameCheap DNS → Vercel)
- **Old domain**: `phuketbusroutes.mintprin.com` → 301 to root domain via `vercel.json` redirects

## Migration notes
- Original Replit app was Express + Vite + MemStorage with `/api/routes` endpoints
- Storage was always in-memory (Drizzle/Neon listed but unused) → trivially portable to static JSON
- Express domain redirects (subdomain → root, www → non-www, http → https) replaced by Vercel platform behavior + `vercel.json` redirects
- `replit.md` retained as historical backstory; this file is canonical Claude guidance

## Workflow preferences (from owner)
- Simple, direct language
- Bilingual TH/EN content always supported
- Iterative; ask before adding new external deps or reintroducing backend
- Mobile-first design preserved
