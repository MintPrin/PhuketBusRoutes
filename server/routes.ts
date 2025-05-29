import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

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



  const httpServer = createServer(app);
  return httpServer;
}

