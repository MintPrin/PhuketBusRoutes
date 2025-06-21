# Phuket Bus Routes & Schedules

## Overview

This is a bilingual (English/Thai) web application providing comprehensive bus route information and schedules for Phuket Airport transportation. The application serves as a digital guide for tourists and locals to navigate Phuket's public bus system, featuring three main airport bus routes (P1, P2, P3) with detailed schedules, stops, and fare information.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server components:

### Frontend Architecture
- **React 18** with TypeScript for type safety and modern React features
- **Component-based architecture** using functional components with hooks
- **Tailwind CSS** for utility-first styling with **shadcn/ui** component library
- **Wouter** for lightweight client-side routing
- **TanStack Query** for efficient data fetching and caching
- **Mobile-first responsive design** optimized for smartphones and tablets

### Backend Architecture
- **Express.js** server with TypeScript support
- **RESTful API** design with `/api/routes` endpoints
- **Memory storage** with in-memory data initialization (expandable to database)
- **Compression middleware** for performance optimization
- **CORS and security** headers for production deployment

### Build System
- **Vite** for fast development and optimized production builds
- **esbuild** for server-side bundling
- **PostCSS** with Autoprefixer for CSS processing
- **ESM modules** throughout the codebase

## Key Components

### Data Layer
- **Schema definition** in `shared/schema.ts` using Drizzle ORM with Zod validation
- **Route data structure** including multilingual content, schedules, and stops
- **Bus route entities** with outbound/inbound schedules and availability flags

### Frontend Components
- **Navigation** with language switching and auto-hide on scroll
- **Hero section** with tropical-themed gradient backgrounds
- **Route Overview** cards for quick route selection
- **Detailed Schedules** with interactive time/stop buttons
- **Direction Selector** for route direction switching
- **Fare Information** with pricing, payment, and luggage details
- **SEO optimization** with structured data and meta tags

### Backend Services
- **Route API** endpoints for fetching bus route data
- **Storage abstraction** allowing easy database integration
- **Static file serving** with Vite integration in development

## Data Flow

1. **Initial Load**: Client fetches route data via TanStack Query from `/api/routes`
2. **Route Selection**: Users browse route overview cards and select specific routes
3. **Schedule Interaction**: 
   - Clicking times opens Google Maps with route directions
   - Clicking stops opens Google Maps location search
4. **Language Switching**: Updates URL and re-renders content in selected language
5. **SEO Optimization**: Dynamic meta tags and structured data based on current language/route

## External Dependencies

### Core Libraries
- **React ecosystem**: React 18, React DOM, hooks for state management
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **Data Fetching**: TanStack Query for server state management
- **Styling**: Tailwind CSS with class-variance-authority for component variants

### Development Tools
- **TypeScript** for type safety across frontend and backend
- **Vite** for development server and build tooling
- **ESLint/Prettier** for code quality (implicit in shadcn/ui setup)
- **Drizzle Kit** for database schema management

### External Services
- **Google Maps** integration for directions and location search
- **Neon Database** support (configured but using memory storage initially)

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server to `dist/index.js` with external package handling
- **Asset optimization**: Compression, minification, and tree-shaking

### Replit Deployment
- **Autoscale deployment** target configured in `.replit`
- **PostgreSQL module** available for database integration
- **Environment variables** for database connections and API keys
- **Port configuration**: Internal port 5000 mapped to external port 80

### Performance Optimizations
- **Compression middleware** for response optimization
- **Static asset caching** with proper headers
- **Image optimization** and lazy loading ready
- **SEO meta tags** with structured data for search engines

## Recent Changes

### Security & SEO Updates (June 21, 2025)
- **Vite Security Patch**: Updated from 5.4.14 to 5.4.15 to patch CVE-2025-30208 vulnerability
- **SEO Link Protection**: Added `nofollow` attributes to all external links (Google Maps, Facebook) to prevent SEO link juice leakage
- **External Link Security**: Enhanced external link handling with proper `noopener noreferrer` attributes

### Link Handling Implementation
- Google Maps direction links now use programmatic link creation with full security attributes
- Google Maps location search links properly configured with nofollow
- Social media links (Facebook) include nofollow to maintain domain authority

## Changelog
- June 17, 2025. Initial setup
- June 21, 2025. Security patches and SEO optimization

## User Preferences

Preferred communication style: Simple, everyday language.