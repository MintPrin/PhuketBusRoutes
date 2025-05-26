import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Flag, Route, Loader2 } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { planRoute, getAllStops } from "@/lib/routePlanning";
import { useToast } from "@/hooks/use-toast";
import type { RouteRecommendation } from "@/data/routes";

export default function RoutePlanner() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [recommendation, setRecommendation] = useState<RouteRecommendation | null>(null);
  const { toast } = useToast();

  const { data: stops = [] } = useQuery({
    queryKey: ["/api/stops"],
    queryFn: () => getAllStops(),
  });

  const planRouteMutation = useMutation({
    mutationFn: planRoute,
    onSuccess: (data) => {
      setRecommendation(data);
      toast({
        title: "Route Found!",
        description: `Take ${data.route.name.en} from ${data.boardingStop} to ${data.exitStop}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "No Route Found",
        description: error.message || "Please try a different destination or check our route maps.",
        variant: "destructive",
      });
    },
  });

  // Listen for hero search events
  useEffect(() => {
    const handleHeroSearch = (event: CustomEvent) => {
      const { origin: heroOrigin, destination: heroDestination } = event.detail;
      setOrigin(heroOrigin);
      setDestination(heroDestination);
      
      // Auto-trigger search
      if (heroDestination.trim()) {
        planRouteMutation.mutate({
          origin: heroOrigin,
          destination: heroDestination,
        });
      }
    };

    window.addEventListener('heroSearch', handleHeroSearch as EventListener);
    return () => window.removeEventListener('heroSearch', handleHeroSearch as EventListener);
  }, []);

  const handlePlanRoute = () => {
    if (!origin.trim() || !destination.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both your current location and destination.",
        variant: "destructive",
      });
      return;
    }

    planRouteMutation.mutate({ origin, destination });
  };

  const getRouteColorClass = (routeId: string) => {
    switch (routeId) {
      case 'P1': return 'bg-blue-400';
      case 'P2': return 'bg-orange-400';
      case 'P3': return 'bg-blue-800';
      default: return 'bg-gray-400';
    }
  };

  return (
    <section id="route-planner" className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Route Planner</h2>
          <p className="text-gray-600">Get personalized route recommendations for your journey</p>
        </div>
        
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Current Location
                </Label>
                <Input 
                  type="text" 
                  placeholder="Select from bus stops only..." 
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full"
                  list="origins"
                />
                <datalist id="origins">
                  {stops.map((stop, index) => (
                    <option key={index} value={stop} />
                  ))}
                </datalist>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  <Flag className="w-4 h-4 inline mr-2" />
                  Destination
                </Label>
                <Input 
                  type="text" 
                  placeholder="Select from bus stops only..." 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full"
                  list="destinations"
                />
                <datalist id="destinations">
                  {stops.map((stop, index) => (
                    <option key={index} value={stop} />
                  ))}
                </datalist>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                onClick={handlePlanRoute}
                disabled={planRouteMutation.isPending || !origin.trim() || !destination.trim()}
                className="bg-ocean hover:bg-teal text-white px-6 py-2 font-semibold transition-colors"
              >
                {planRouteMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Planning Route...
                  </>
                ) : (
                  <>
                    <Route className="w-4 h-4 mr-2" />
                    Plan My Route
                  </>
                )}
              </Button>
            </div>
            
            {/* Results Area */}
            {recommendation && (
              <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Recommended Route</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className={`w-5 h-5 ${getRouteColorClass(recommendation.route.routeId)} rounded-full mr-3 mt-1 flex-shrink-0`}></div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-green-800 mb-2">
                        Route {recommendation.route.routeId} - {recommendation.route.name.en}
                      </h4>
                      <p className="text-green-700 text-sm mb-3">Best option for your journey</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-700">Board at:</span>
                          <span className="text-gray-900">{recommendation.boardingStop}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-700">Get off at:</span>
                          <span className="text-gray-900">{recommendation.exitStop}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-700">Estimated fare:</span>
                          <span className="text-green-600 font-semibold">{recommendation.estimatedFare}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
