export interface BusStop {
  en: string;
  th: string;
}

export interface BusRoute {
  id: string;
  routeId: string;
  name: {
    en: string;
    th: string;
  };
  color: string;
  description: {
    en: string;
    th: string;
  };
  stops: BusStop[];
  times: string[];
}

export interface RouteRecommendation {
  route: BusRoute;
  boardingStop: string;
  exitStop: string;
  nextDeparture: string;
  estimatedFare: string;
  confidence: number;
}
