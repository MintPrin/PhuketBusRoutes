import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, MapPin, Clock, Route, Smartphone, Navigation, CreditCard } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function HelpModal() {
  const { t } = useTranslation();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <HelpCircle className="w-4 h-4" />
          {t('nav.help')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{t('help.title')}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="flex gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="text-white w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Click on Bus Stop Names</h3>
                <p className="text-sm text-gray-600 mb-2">Tap any bus stop location to open Google Maps with:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Exact GPS coordinates and location</li>
                  <li>• Turn-by-turn directions from your current location</li>
                  <li>• Street view and nearby landmarks</li>
                  <li>• Walking time estimates to the stop</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="text-white w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Click on Departure Times</h3>
                <p className="text-sm text-gray-600 mb-2">Tap any time to get intelligent route planning:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Complete route with all stops and transfers</li>
                  <li>• Real-time traffic and travel duration</li>
                  <li>• Automatically schedules for today or tomorrow</li>
                  <li>• Alternative transportation options</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Route className="text-white w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Switch Route Directions</h3>
                <p className="text-sm text-gray-600 mb-2">Toggle between directions to see schedules:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• "To Airport" - From destinations to Phuket Airport</li>
                  <li>• "From Airport" - From Phuket Airport to destinations</li>
                  <li>• Different schedules and timing for each direction</li>
                  <li>• Plan your complete round-trip journey</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Smartphone className="text-white w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Mobile Navigation Features</h3>
                <p className="text-sm text-gray-600 mb-2">Optimized for mobile devices with:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Smooth momentum scrolling between sections</li>
                  <li>• Touch-friendly buttons and interactive elements</li>
                  <li>• Links open directly in your phone's map app</li>
                  <li>• Works offline once page is loaded</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CreditCard className="text-white w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Payment & Boarding Tips</h3>
                <p className="text-sm text-gray-600 mb-2">Important information for travelers:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Pay cash directly to the driver (no cards accepted)</li>
                  <li>• Fare varies by distance, maximum 100 THB</li>
                  <li>• Standard luggage allowed free of charge</li>
                  <li>• Arrive 5-10 minutes before departure time</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">
              <Navigation className="w-4 h-4" />
              <span className="font-medium">Pro Tip:</span>
              <span>All map links automatically open in your preferred navigation app (Google Maps, Apple Maps, etc.) for seamless journey planning.</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}