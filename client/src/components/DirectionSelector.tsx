import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { BusRoute } from "@/data/routes";

interface DirectionSelectorProps {
  route: BusRoute;
  selectedDirection: 'outbound' | 'inbound';
  onDirectionChange: (direction: 'outbound' | 'inbound') => void;
}

export default function DirectionSelector({ route, selectedDirection, onDirectionChange }: DirectionSelectorProps) {
  const outbound = route.schedules.outbound;
  const inbound = route.schedules.inbound;

  return (
    <div className="mb-6">
      <Select value={selectedDirection} onValueChange={(value: 'outbound' | 'inbound') => onDirectionChange(value)}>
        <SelectTrigger className="w-full max-w-md mx-auto">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="w-[400px]">
          <SelectItem value="outbound">
            <div className="flex items-center gap-2 min-w-0">
              <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-medium truncate">{outbound.origin}</span>
                <span className="text-gray-500 flex-shrink-0">→</span>
                <span className="font-medium truncate">{outbound.destination}</span>
              </div>
            </div>
          </SelectItem>
          {inbound && (
            <SelectItem value="inbound" disabled={!inbound.available}>
              <div className="flex items-center gap-2 min-w-0">
                <ArrowLeft className="h-4 w-4 text-orange-600 flex-shrink-0" />
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium truncate">{inbound.origin}</span>
                  <span className="text-gray-500 flex-shrink-0">→</span>
                  <span className="font-medium truncate">{inbound.destination}</span>
                </div>
                {!inbound.available && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                    Coming Soon
                  </span>
                )}
              </div>
            </SelectItem>
          )}
        </SelectContent>
      </Select>
      
      {/* Clear direction indicator */}
      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-blue-800">
          {selectedDirection === 'outbound' ? (
            <>
              <ArrowRight className="h-4 w-4" />
              <span>Showing departures from {outbound.origin} to {outbound.destination}</span>
            </>
          ) : (
            <>
              <ArrowLeft className="h-4 w-4" />
              <span>Showing departures from {inbound?.origin} to {inbound?.destination}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}