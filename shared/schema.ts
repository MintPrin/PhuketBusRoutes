import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const busRoutes = pgTable("bus_routes", {
  id: serial("id").primaryKey(),
  routeId: text("route_id").notNull().unique(),
  name: jsonb("name").notNull(), // {en: string, th: string}
  color: text("color").notNull(),
  stops: jsonb("stops").notNull(), // Array of {en: string, th: string}
  schedules: jsonb("schedules").notNull(), // {outbound: {times: string[], origin: string, destination: string}, inbound?: {times: string[], origin: string, destination: string}}
  description: jsonb("description").notNull(), // {en: string, th: string}
});

export const routeRecommendations = pgTable("route_recommendations", {
  id: serial("id").primaryKey(),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  recommendedRoute: text("recommended_route").notNull(),
  boardingStop: text("boarding_stop").notNull(),
  exitStop: text("exit_stop").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBusRouteSchema = createInsertSchema(busRoutes).omit({
  id: true,
});

export const insertRouteRecommendationSchema = createInsertSchema(routeRecommendations).omit({
  id: true,
  createdAt: true,
});

export const routePlanRequestSchema = z.object({
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
});

export type BusRoute = typeof busRoutes.$inferSelect;
export type InsertBusRoute = z.infer<typeof insertBusRouteSchema>;
export type RouteRecommendation = typeof routeRecommendations.$inferSelect;
export type InsertRouteRecommendation = z.infer<typeof insertRouteRecommendationSchema>;
export type RoutePlanRequest = z.infer<typeof routePlanRequestSchema>;
