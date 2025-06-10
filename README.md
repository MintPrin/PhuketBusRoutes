# Phuket Bus Routes & Schedules

A bilingual website providing bus schedules and route information for Phuket Airport transportation to popular destinations.

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open browser to `http://localhost:5000`

## Project Structure

```
├── client/           # React frontend with TypeScript
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components  
│   │   ├── i18n/         # English & Thai translations
│   │   └── hooks/        # Custom hooks & utilities
├── server/           # Express backend
└── shared/           # Shared types & schemas
```

## Key Features

- **Bilingual Support**: English and Thai with URL-based routing (`/th/`)
- **Mobile-First Design**: Optimized for smartphones and tablets
- **Route Information**: Complete schedules for P1, P2, P3 airport buses
- **Google Maps Integration**: Direct links to route directions
- **SEO Optimized**: International SEO with structured data

## Bus Routes

### P1 - Light Blue Bus
Airport → Patong Beach (15-100 THB)

### P2 - Orange Bus  
Airport → Karon → Kata Beach (15-100 THB)

### P3 - Dark Blue Bus
Airport → Phuket Town → Bus Terminal (15-50 THB)

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS + shadcn/ui components  
- Express.js backend
- Wouter for routing
- TanStack Query for data fetching

---

**Live Site**: [phuketbusroutes.mintprin.com](https://phuketbusroutes.mintprin.com)