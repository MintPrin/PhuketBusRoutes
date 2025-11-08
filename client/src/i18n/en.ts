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
  ] as string[],
  "help.times.title": "Click on Departure Times",
  "help.times.description": "Tap any time to get intelligent route planning:",
  "help.times.features": [
    "Complete route with all stops and transfers",
    "Real-time traffic and travel duration",
    "Automatically schedules for today or tomorrow",
    "Alternative transportation options"
  ] as string[],
  "help.directions.title": "Switch Route Directions",
  "help.directions.description": "Toggle between directions to see schedules:",
  "help.directions.features": [
    "\"To Airport\" - From destinations to Phuket Airport",
    "\"From Airport\" - From Phuket Airport to destinations",
    "Different schedules and timing for each direction",
    "Plan your complete round-trip journey"
  ] as string[],
  "help.mobile.title": "Mobile Navigation Features",
  "help.mobile.description": "Optimized for mobile devices with:",
  "help.mobile.features": [
    "Smooth momentum scrolling between sections",
    "Touch-friendly buttons and interactive elements",
    "Links open directly in your phone's map app",
    "Works offline once page is loaded"
  ] as string[],
  "help.payment.title": "Payment & Boarding Tips",
  "help.payment.description": "Important information for travelers:",
  "help.payment.features": [
    "Pay cash directly to the driver (no cards accepted)",
    "Fare varies by distance, maximum 100 THB",
    "Standard luggage allowed free of charge",
    "Arrive 5-10 minutes before departure time"
  ] as string[],
  "help.tip.title": "Pro Tip:",
  "help.tip.description": "All map links automatically open in your preferred navigation app (Google Maps, Apple Maps, etc.) for seamless journey planning.",

  // Route colors
  "route.color.lightblue": "Light Blue",
  "route.color.orange": "Orange", 
  "route.color.darkblue": "Dark Blue",

  // Route destinations
  "route.destination.airport": "Airport",
  "route.destination.beach": "Beach Area",
  "route.destination.town": "Town",
  "route.destination.terminal": "Bus Terminal",

  // Schedule labels
  "schedule.first": "First Bus",
  "schedule.last": "Last Bus", 
  "schedule.departures": "Departure Times",
  "schedule.available": "Available",
  "schedule.unavailable": "Not Available",

  // About Section
  "about.title": "About This Guide",
  "about.story.title": "Why I Created This",
  "about.story.description": "I noticed an outdated website still getting tens of thousands of visits each month with incorrect bus information. The most reliable sources were actually posters at the bus terminal and social media pages, with rarely updated official websites. I decided to help get accurate information to travelers who need it.",
  "about.sources.title": "Information Sources",
  "about.sources.description": "All schedules are gathered from:",
  "about.sources.list": [
    "Official posters at Phuket bus terminals",
    "Bus operator social media pages (Facebook)",
    "Rarely updated official websites"
  ] as string[],
  "about.updates.title": "Keeping It Current",
  "about.updates.description": "If you notice any outdated or incorrect information, please let me know. I'm committed to keeping this guide accurate and helpful for everyone traveling in Phuket.",

  // Footer
  "footer.description": "Your comprehensive guide to navigating Phuket's public transportation system with real-time schedules and route information.",
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