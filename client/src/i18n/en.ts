export const en = {
  // Navigation
  "nav.help": "Help",
  "nav.language": "EN",

  // Hero Section
  "hero.title": "Your Guide to Phuket Bus Routes",
  "hero.subtitle": "Find schedules, routes, and real-time information for airport buses and local transportation",
  "hero.cta.schedules": "View Schedules",
  "hero.cta.routes": "Browse Routes",

  // Route Overview
  "routes.title": "Bus Routes Overview",
  "routes.subtitle": "Choose your route to see detailed schedules and stops",
  "routes.direction.to": "To Airport",
  "routes.direction.from": "From Airport",

  // Detailed Schedules
  "schedules.title": "Detailed Schedules",
  "schedules.subtitle": "Click on times for directions, click on stops for location",

  // Fare Information
  "fare.title": "Fare Information",
  "fare.subtitle": "Transparent pricing for all routes",
  "fare.pricing.title": "Distance-Based Pricing",
  "fare.pricing.description": "Fare varies by distance traveled",
  "fare.pricing.amount": "Max 100 THB",
  "fare.payment.title": "Payment Methods",
  "fare.payment.description": "Cash payment directly to driver",
  "fare.payment.method": "Cash Only",
  "fare.luggage.title": "Luggage Policy",
  "fare.luggage.description": "Standard luggage allowed free of charge",
  "fare.luggage.cost": "Free",

  // Help Modal
  "help.title": "How to Use Phuket Bus Routes",
  "help.stops.title": "Click on Bus Stop Names",
  "help.stops.description": "Tap any bus stop location to open Google Maps with:",
  "help.stops.features": [
    "Exact GPS coordinates and location",
    "Turn-by-turn directions from your current location",
    "Street view and nearby landmarks",
    "Walking time estimates to the stop"
  ],
  "help.times.title": "Click on Departure Times",
  "help.times.description": "Tap any time to get intelligent route planning:",
  "help.times.features": [
    "Complete route with all stops and transfers",
    "Real-time traffic and travel duration",
    "Automatically schedules for today or tomorrow",
    "Alternative transportation options"
  ],
  "help.directions.title": "Switch Route Directions",
  "help.directions.description": "Toggle between directions to see schedules:",
  "help.directions.features": [
    "\"To Airport\" - From destinations to Phuket Airport",
    "\"From Airport\" - From Phuket Airport to destinations",
    "Different schedules and timing for each direction",
    "Plan your complete round-trip journey"
  ],
  "help.mobile.title": "Mobile Navigation Features",
  "help.mobile.description": "Optimized for mobile devices with:",
  "help.mobile.features": [
    "Smooth momentum scrolling between sections",
    "Touch-friendly buttons and interactive elements",
    "Links open directly in your phone's map app",
    "Works offline once page is loaded"
  ],
  "help.payment.title": "Payment & Boarding Tips",
  "help.payment.description": "Important information for travelers:",
  "help.payment.features": [
    "Pay cash directly to the driver (no cards accepted)",
    "Fare varies by distance, maximum 100 THB",
    "Standard luggage allowed free of charge",
    "Arrive 5-10 minutes before departure time"
  ],
  "help.tip.title": "Pro Tip:",
  "help.tip.description": "All map links automatically open in your preferred navigation app (Google Maps, Apple Maps, etc.) for seamless journey planning.",

  // Footer
  "footer.routes": "Routes",
  "footer.schedules": "Schedules",
  "footer.fares": "Fares",
  "footer.help": "Help",
  "footer.about": "About",
  "footer.contact": "Contact",
  "footer.privacy": "Privacy",
  "footer.terms": "Terms"
} as const;

export type TranslationKeys = keyof typeof en;