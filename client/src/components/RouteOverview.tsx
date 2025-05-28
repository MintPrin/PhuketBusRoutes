import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { getAllRoutes } from "@/lib/routePlanning";
import type { BusRoute } from "@/data/routes";

export default function RouteOverview() {
  const { data: routes = [], isLoading } = useQuery({
    queryKey: ["/api/routes"],
    queryFn: () => getAllRoutes(),
  });

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Bus Routes Overview</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const getRouteColorClass = (routeId: string) => {
    switch (routeId) {
      case 'P1': return 'border-blue-400';
      case 'P2': return 'border-orange-400';
      case 'P3': return 'border-blue-800';
      default: return 'border-gray-400';
    }
  };

  const getRouteIndicatorClass = (routeId: string) => {
    switch (routeId) {
      case 'P1': return 'bg-blue-400';
      case 'P2': return 'bg-orange-400';
      case 'P3': return 'bg-blue-800';
      default: return 'bg-gray-400';
    }
  };

  return (
    <section className="py-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bus Routes Overview</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-ocean to-teal mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {routes.map((route: BusRoute) => {
            const outboundSchedule = route.schedules?.outbound;
            const firstTime = outboundSchedule?.times?.[0] || '--';
            const lastTime = outboundSchedule?.times?.[outboundSchedule.times.length - 1] || '--';
            
            return (
              <Card key={route.routeId} className={`shadow-lg border-l-4 ${getRouteColorClass(route.routeId)} hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1`}>
                <CardContent className="p-4 relative overflow-hidden flex flex-col h-full">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-blue-50 rounded-bl-full"></div>
                  <div className="flex items-center mb-3">
                    <div className={`w-5 h-5 ${getRouteIndicatorClass(route.routeId)} rounded-full mr-3 shadow-md flex-shrink-0`}></div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                      Route {route.routeId}{route.routeId === 'P1' ? ' / Route 8357' : route.routeId === 'P2' ? ' / Route 8411' : ''}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-3 text-sm font-medium leading-tight">{route.name?.en}</p>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-grow min-h-[3rem] flex items-start">{route.description?.en}</p>
                  <div className="text-sm bg-gray-50 rounded-lg p-3 mt-auto">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700 whitespace-nowrap">First Bus:</span>
                      <span className="text-gray-900 font-semibold">{firstTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 whitespace-nowrap">Last Bus:</span>
                      <span className="text-gray-900 font-semibold">{lastTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
