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
- **Route Information**: Schedules for P1, P2, P3 airport buses plus P4 Town–Patong and the free P5 Dragon Line loop
- **Google Maps Integration**: Direct links to route directions
- **SEO Optimized**: International SEO with structured data

## Bus Routes

### P1 - Light Blue Bus
Airport → Patong Beach (15-100 THB)

### P2 - Orange Bus  
Airport → Karon → Kata Beach (15-100 THB)

### P3 - Dark Blue Bus
Airport → Patong → Karon → Kata Express (100 THB)

### P4 - Yellow Smart Bus
Phuket Town (Bus Terminal 1) → Kathu → Patong (50 THB flat)

### P5 - Dragon Line
Free EV loop around Phuket Old Town, 07:00–19:00

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS + shadcn/ui components  
- Express.js backend
- Wouter for routing
- TanStack Query for data fetching

---

**Live Site**: [phuketbusroutes.com](https://phuketbusroutes.com)