export interface BusStop {
  en: string;
  th: string;
}

export interface BusSchedule {
  times: string[];
  origin: string;
  destination: string;
  available: boolean;
}

export interface RouteMeta {
  routeNumber?: string;
  operator?: string;
  payment?: string[];
  lastVerified?: string;
  sources?: string[];
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
  stopsInbound?: BusStop[];
  schedules: {
    outbound: BusSchedule;
    inbound?: BusSchedule;
  };
  meta?: RouteMeta;
}

export interface RouteRecommendation {
  route: BusRoute;
  boardingStop: string;
  exitStop: string;
  nextDeparture: string;
  estimatedFare: string;
  confidence: number;
}
