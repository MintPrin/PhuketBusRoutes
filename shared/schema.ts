import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
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

export const insertBusRouteSchema = createInsertSchema(busRoutes).omit({
  id: true,
});

export type BusRoute = typeof busRoutes.$inferSelect;
export type InsertBusRoute = typeof insertBusRouteSchema._type;
