import { apiRequest } from "./queryClient";
import type { RouteRecommendation } from "../data/routes";

export interface RoutePlanRequest {
  origin: string;
  destination: string;
}

export async function planRoute(request: RoutePlanRequest): Promise<RouteRecommendation> {
  const response = await apiRequest("POST", "/api/plan-route", request);
  return response.json();
}

export async function getAllStops(): Promise<string[]> {
  const response = await apiRequest("GET", "/api/stops");
  return response.json();
}

export async function getAllRoutes() {
  const response = await apiRequest("GET", "/api/routes");
  return response.json();
}
