import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const routes = [
    { id: 'P1', name: 'Route P1 (Light Blue)', color: '#60A5FA' },
    { id: 'P2', name: 'Route P2 (Orange)', color: '#FB923C' },
    { id: 'P3', name: 'Route P3 (Dark Blue)', color: '#1E40AF' }
  ];

  useEffect(() => {
    if (window.google && window.google.maps && mapRef.current) {
      initializeMap();
    } else {
      // Wait for Google Maps to load
      const checkGoogleMaps = setInterval(() => {
        if (window.google && window.google.maps && mapRef.current) {
          clearInterval(checkGoogleMaps);
          initializeMap();
        }
      }, 100);

      return () => clearInterval(checkGoogleMaps);
    }
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 8.1132, lng: 98.3291 }, // Phuket center
      zoom: 11,
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
        }
      ]
    });

    // Add airport marker
    new window.google.maps.Marker({
      position: { lat: 8.1132, lng: 98.3169 },
      map: map,
      title: "Phuket International Airport",
      icon: {
        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="15" fill="#0891B2"/>
            <text x="15" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">✈</text>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(30, 30)
      }
    });

    // Add major destination markers
    const destinations = [
      { name: "Patong Beach", lat: 7.8965, lng: 98.2964 },
      { name: "Karon Beach", lat: 7.8396, lng: 98.2946 },
      { name: "Kata Beach", lat: 7.8162, lng: 98.2962 },
      { name: "Phuket Town", lat: 7.8804, lng: 98.3923 },
      { name: "Rawai Beach", lat: 7.7731, lng: 98.3213 }
    ];

    destinations.forEach(dest => {
      new window.google.maps.Marker({
        position: { lat: dest.lat, lng: dest.lng },
        map: map,
        title: dest.name,
        icon: {
          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="10" fill="#F59E0B"/>
              <circle cx="10" cy="10" r="4" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(20, 20)
        }
      });
    });

    setMapLoaded(true);
  };

  const toggleRoute = (routeId: string) => {
    setSelectedRoute(selectedRoute === routeId ? null : routeId);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Interactive Route Map</h2>
          <p className="text-gray-600">Explore all bus routes and stops on the map</p>
        </div>
        
        <Card className="shadow-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <div className="flex flex-wrap gap-4 justify-center">
              {routes.map(route => (
                <Button
                  key={route.id}
                  onClick={() => toggleRoute(route.id)}
                  variant={selectedRoute === route.id ? "default" : "outline"}
                  size="sm"
                  className="flex items-center"
                  style={{
                    backgroundColor: selectedRoute === route.id ? route.color : undefined,
                    borderColor: route.color,
                    color: selectedRoute === route.id ? 'white' : route.color
                  }}
                >
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: selectedRoute === route.id ? 'white' : route.color }}
                  ></div>
                  {route.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div 
              ref={mapRef}
              className="w-full h-96"
              style={{ minHeight: '384px' }}
            />
            
            {!mapLoaded && (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Loading interactive map...</p>
                  <p className="text-sm text-gray-400">Google Maps integration with bus routes and stops</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
