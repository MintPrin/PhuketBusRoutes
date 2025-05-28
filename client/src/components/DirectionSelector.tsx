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
        <SelectContent className="w-full min-w-[300px] max-w-[90vw]">
          <SelectItem value="outbound">
            <div className="flex items-center gap-1 sm:gap-2 min-w-0 w-full">
              <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                <span className="font-medium truncate text-xs sm:text-sm">{outbound.origin}</span>
                <span className="text-gray-500 flex-shrink-0">→</span>
                <span className="font-medium truncate text-xs sm:text-sm">{outbound.destination}</span>
              </div>
            </div>
          </SelectItem>
          {inbound && (
            <SelectItem value="inbound" disabled={!inbound.available}>
              <div className="flex items-center gap-1 sm:gap-2 min-w-0 w-full">
                <ArrowLeft className="h-4 w-4 text-orange-600 flex-shrink-0" />
                <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                  <span className="font-medium truncate text-xs sm:text-sm">{inbound.origin}</span>
                  <span className="text-gray-500 flex-shrink-0">←</span>
                  <span className="font-medium truncate text-xs sm:text-sm">{inbound.destination}</span>
                </div>
                {!inbound.available && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-1 sm:px-2 py-0.5 rounded-full ml-1 sm:ml-2 flex-shrink-0">
                    Coming Soon
                  </span>
                )}
              </div>
            </SelectItem>
          )}
        </SelectContent>
      </Select>
      
      {/* Clear direction indicator */}
      <div className="mt-3 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-blue-800">
          {selectedDirection === 'outbound' ? (
            <>
              <ArrowRight className="h-4 w-4 flex-shrink-0" />
              <span className="text-center flex items-center gap-1">
                <span className="hidden sm:inline">Showing departures from </span>
                <span className="font-semibold">{outbound.origin}</span>
                <span className="flex items-center justify-center">→</span>
                <span className="font-semibold">{outbound.destination}</span>
              </span>
            </>
          ) : (
            <>
              <ArrowLeft className="h-4 w-4 flex-shrink-0" />
              <span className="text-center flex items-center gap-1">
                <span className="hidden sm:inline">Showing departures from </span>
                <span className="font-semibold">{inbound?.origin}</span>
                <span className="flex items-center justify-center">←</span>
                <span className="font-semibold">{inbound?.destination}</span>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}