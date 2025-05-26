import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Route, Clock } from "lucide-react";
import { getAllRoutes } from "@/lib/routePlanning";
import type { BusRoute, BusStop } from "@/data/routes";

export default function DetailedSchedules() {
  const { data: routes = [], isLoading } = useQuery({
    queryKey: ["/api/routes"],
    queryFn: () => getAllRoutes(),
  });

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Complete Bus Schedules</h2>
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse shadow-lg">
                <div className="h-20 bg-gray-200 rounded-t-xl"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="h-16 bg-gray-100 rounded-lg"></div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((j) => (
                        <div key={j} className="h-10 bg-gray-100 rounded-lg"></div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const getRouteHeaderClass = (routeId: string) => {
    switch (routeId) {
      case 'P1': return 'bg-blue-400';
      case 'P2': return 'bg-orange-400';
      case 'P3': return 'bg-blue-800';
      default: return 'bg-gray-400';
    }
  };

  const getRouteTimeClass = (routeId: string) => {
    switch (routeId) {
      case 'P1': return 'bg-blue-50 text-blue-800';
      case 'P2': return 'bg-orange-50 text-orange-800';
      case 'P3': return 'bg-blue-50 text-blue-900';
      default: return 'bg-gray-50 text-gray-800';
    }
  };

  const getRouteStopClass = (routeId: string) => {
    switch (routeId) {
      case 'P1': return 'bg-blue-400';
      case 'P2': return 'bg-orange-400';
      case 'P3': return 'bg-blue-800';
      default: return 'bg-gray-400';
    }
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-6">Complete Bus Schedules</h2>
        
        <div className="space-y-6">
          {routes.map((route: BusRoute) => (
            <Card key={route.routeId} className="shadow-lg overflow-hidden">
              <div className={`${getRouteHeaderClass(route.routeId)} text-white p-4`}>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-white rounded-full mr-3"></div>
                  <div>
                    <h3 className="text-xl font-bold">
                      Route {route.routeId} / {route.name?.en}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {route.description?.en}
                    </p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Route Stops */}
                  <div>
                    <h4 className="text-base font-semibold mb-3 flex items-center text-gray-900">
                      <Route className="w-4 h-4 mr-2 text-ocean" />
                      Route Stops
                    </h4>
                    <div className="space-y-2">
                      {(route.stops as BusStop[])?.map((stop, index) => (
                        <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 ${getRouteStopClass(route.routeId)} rounded-full mr-3 flex-shrink-0`}></div>
                          <div className="flex-grow">
                            <p className="font-medium text-gray-900 text-sm">{stop.en}</p>
                            <p className="text-xs text-gray-600">{stop.th}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Departure Times */}
                  <div>
                    <h4 className="text-base font-semibold mb-3 flex items-center text-gray-900">
                      <Clock className="w-4 h-4 mr-2 text-ocean" />
                      Departure Times (from Airport)
                    </h4>
                    <div className="grid grid-cols-4 gap-2">
                      {route.times?.map((time, index) => (
                        <div 
                          key={index} 
                          className={`${getRouteTimeClass(route.routeId)} px-2 py-1 rounded text-center font-medium text-xs`}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
