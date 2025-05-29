import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Route, Smartphone } from "lucide-react";

export default function FeatureGuide() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">How to Use This Website</h2>
          <p className="text-gray-600">Interactive features to help you navigate Phuket</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="text-white text-lg" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Click Locations</h3>
              <p className="text-gray-600 text-sm">Click any bus stop name to open Google Maps with exact location and directions</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="text-white text-lg" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Click Departure Times</h3>
              <p className="text-gray-600 text-sm">Click any time to get Google Maps route with travel time estimates</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Route className="text-white text-lg" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Switch Directions</h3>
              <p className="text-gray-600 text-sm">Toggle between "To Airport" and "From Airport" to see return schedules</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Smartphone className="text-white text-lg" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Mobile Optimized</h3>
              <p className="text-gray-600 text-sm">Smooth scrolling and touch-friendly interface designed for mobile devices</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
            <MapPin className="text-blue-600 w-4 h-4" />
            <span className="text-sm text-blue-800 font-medium">Tip: All links open directly in your phone's map app for easy navigation</span>
          </div>
        </div>
      </div>
    </section>
  );
}