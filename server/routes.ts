import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { routePlanRequestSchema, type RoutePlanRequest } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all bus routes
  app.get("/api/routes", async (req, res) => {
    try {
      const routes = await storage.getAllBusRoutes();
      res.json(routes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch routes" });
    }
  });

  // Get specific route by routeId
  app.get("/api/routes/:routeId", async (req, res) => {
    try {
      const { routeId } = req.params;
      const route = await storage.getBusRouteByRouteId(routeId);
      
      if (!route) {
        return res.status(404).json({ message: "Route not found" });
      }
      
      res.json(route);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch route" });
    }
  });

  // Plan route recommendation
  app.post("/api/plan-route", async (req, res) => {
    try {
      const validatedData = routePlanRequestSchema.parse(req.body);
      const { origin, destination } = validatedData;
      
      // Get all routes for analysis
      const allRoutes = await storage.getAllBusRoutes();
      
      // Enhanced route planning algorithm
      let bestRoute = null;
      let boardingStop = "";
      let exitStop = "";
      let confidence = 0;

      for (const route of allRoutes) {
        const stops = route.stops as Array<{en: string, th: string}>;
        
        // Find origin stop with flexible matching
        const originMatch = stops.find(stop => {
          const stopName = stop.en.toLowerCase();
          const originLower = origin.toLowerCase();
          
          return stopName.includes(originLower) ||
                 originLower.includes(stopName) ||
                 stopName === originLower ||
                 (originLower.includes('airport') && stopName.includes('airport')) ||
                 (originLower.includes('international') && stopName.includes('international'));
        });

        // Find destination stop with flexible matching
        const destinationMatch = stops.find(stop => {
          const stopName = stop.en.toLowerCase();
          const destLower = destination.toLowerCase();
          
          return stopName.includes(destLower) ||
                 destLower.includes(stopName) ||
                 stopName === destLower ||
                 (destLower.includes('terminal') && stopName.includes('terminal')) ||
                 (destLower.includes('bus terminal') && stopName.includes('bus terminal')) ||
                 (destLower.includes('patong') && stopName.includes('patong')) ||
                 (destLower.includes('karon') && stopName.includes('karon')) ||
                 (destLower.includes('kata') && stopName.includes('kata'));
        });

        // Both origin and destination must be on the route
        if (originMatch && destinationMatch) {
          const originIndex = stops.findIndex(stop => stop.en === originMatch.en);
          const destIndex = stops.findIndex(stop => stop.en === destinationMatch.en);
          
          // Check if it's a valid journey (origin comes before destination)
          if (originIndex < destIndex) {
            const currentConfidence = calculateConfidence(destination, destinationMatch) + 
                                    calculateConfidence(origin, originMatch);
            
            if (currentConfidence > confidence) {
              confidence = currentConfidence;
              bestRoute = route;
              boardingStop = originMatch.en;
              exitStop = destinationMatch.en;
            }
          }
        }
      }

      if (!bestRoute) {
        return res.status(404).json({ 
          message: "No suitable route found for the specified destination. Please check our route maps or try a different destination."
        });
      }

      // Calculate estimated fare (distance-based)
      const estimatedFare = calculateFare(boardingStop, exitStop, bestRoute);

      // Store recommendation for analytics
      await storage.createRouteRecommendation({
        origin,
        destination,
        recommendedRoute: bestRoute.routeId,
        boardingStop,
        exitStop
      });

      // Get next departure time from current schedule
      const nextDeparture = getNextDeparture(bestRoute.schedules?.outbound?.times || bestRoute.times || []);
      
      const recommendation = {
        route: bestRoute,
        boardingStop,
        exitStop,
        nextDeparture,
        estimatedFare,
        confidence
      };

      res.json(recommendation);
      
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid request data. Please provide both origin and destination."
        });
      }
      res.status(500).json({ message: "Failed to plan route" });
    }
  });

  // Get all stops for autocomplete
  app.get("/api/stops", async (req, res) => {
    try {
      const routes = await storage.getAllBusRoutes();
      const allStops = new Set<string>();
      
      routes.forEach(route => {
        const stops = route.stops as Array<{en: string, th: string}>;
        stops.forEach(stop => {
          allStops.add(stop.en);
        });
      });
      
      res.json(Array.from(allStops).sort());
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stops" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper functions
function calculateConfidence(input: string, stop: {en: string, th: string}): number {
  const inputLower = input.toLowerCase();
  const stopLower = stop.en.toLowerCase();
  
  if (stopLower === inputLower) return 1.0;
  if (stopLower.includes(inputLower)) return 0.9;
  if (inputLower.includes(stopLower.split(' ')[0])) return 0.8;
  
  // Keyword matching for common destinations
  const keywords = {
    'patong': ['patong'],
    'karon': ['karon'],
    'kata': ['kata'],
    'rawai': ['rawai'],
    'surin': ['surin'],
    'airport': ['airport', 'international'],
    'town': ['town', 'city', 'central'],
    'beach': ['beach', 'หาด']
  };
  
  for (const [key, variations] of Object.entries(keywords)) {
    if (variations.some(v => inputLower.includes(v)) && stopLower.includes(key)) {
      return 0.7;
    }
  }
  
  return 0.1;
}

function findClosestStop(origin: string, stops: Array<{en: string, th: string}>): string {
  // For now, default to first stop (airport), but this could be enhanced
  // with actual geolocation matching
  return stops[0].en;
}

function getNextDeparture(times: string[]): string {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const nextTime = times.find(time => {
    const [hours, minutes] = time.split(':').map(Number);
    const departureTime = hours * 60 + minutes;
    return departureTime > currentTime;
  });
  
  return nextTime || `${times[0]} (Next Day)`;
}

function calculateFare(boardingStop: string, exitStop: string, route: any): string {
  // Simple distance-based fare calculation
  // In reality, this would use actual stop distances
  const stops = route.stops as Array<{en: string, th: string}>;
  const boardingIndex = stops.findIndex(stop => stop.en === boardingStop);
  const exitIndex = stops.findIndex(stop => stop.en === exitStop);
  
  const distance = Math.abs(exitIndex - boardingIndex);
  
  if (distance <= 2) return "20-40 THB";
  if (distance <= 5) return "40-60 THB";
  if (distance <= 8) return "60-80 THB";
  return "80-100 THB";
}
