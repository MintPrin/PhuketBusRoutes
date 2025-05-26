import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllStops } from "@/lib/routePlanning";

export default function Hero() {
  const [origin, setOrigin] = useState("Phuket Airport");
  const [destination, setDestination] = useState("");

  const { data: stops = [] } = useQuery({
    queryKey: ["/api/stops"],
    queryFn: () => getAllStops(),
  });

  const handleSearch = () => {
    if (destination.trim()) {
      const element = document.getElementById('route-planner');
      element?.scrollIntoView({ behavior: 'smooth' });
      
      // Trigger route planning with the selected values
      const event = new CustomEvent('heroSearch', { 
        detail: { origin, destination } 
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <section className="relative py-12 overflow-hidden">
      {/* Subtle tropical background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-500"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/15 via-transparent to-orange-300/20"></div>
      
      {/* Gentle floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-32 h-32 bg-yellow-200/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-40 h-40 bg-orange-300/20 rounded-full blur-3xl animate-bounce" style={{animationDuration: '4s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-pink-200/15 rounded-full blur-2xl animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-emerald-200/18 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      {/* Geometric wave patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform rotate-12 scale-150 opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-l from-transparent via-cyan-300/20 to-transparent transform -rotate-12 scale-150 opacity-40"></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white drop-shadow-lg">
            Navigate Phuket with Ease
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90 drop-shadow-md">
            Complete bus schedule and route information from Phuket Airport to all major destinations
          </p>
          
          {/* Quick Search */}
          <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-xl p-6 max-w-3xl mx-auto shadow-2xl border border-white/20">
            <h2 className="text-gray-900 text-lg font-semibold mb-4 flex items-center justify-center">
              <Search className="w-5 h-5 mr-2 text-ocean" />
              Find Your Route
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">From</Label>
                <Select value={origin} onValueChange={setOrigin}>
                  <SelectTrigger className="w-full border-2 border-gray-200 focus:border-ocean">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Phuket Airport">Phuket International Airport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">To</Label>
                <Input 
                  type="text" 
                  placeholder="Enter destination..." 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full border-2 border-gray-200 focus:border-ocean"
                  list="destinations"
                />
                <datalist id="destinations">
                  {stops.map((stop, index) => (
                    <option key={index} value={stop} />
                  ))}
                </datalist>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  className="w-full bg-ocean hover:bg-blue-700 text-white font-semibold py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
                  disabled={!destination.trim()}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Routes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
