import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Route, Clock, AlertTriangle, ExternalLink } from "lucide-react";
import { openGoogleMapsDirections } from "@/lib/googleMapsUtils";
import DirectionSelector from "@/components/DirectionSelector";
import { useTranslation } from "@/hooks/useTranslation";
import type { BusRoute, BusStop } from "@/data/routes";

export default function DetailedSchedules() {
  const { t, language } = useTranslation();
  const [selectedDirections, setSelectedDirections] = useState<Record<string, 'outbound' | 'inbound'>>({});
  
  // Function to get Google Maps search term for a stop
  const getGoogleMapsSearchTerm = (stopName: string): string => {
    // Special mapping for stops that need different search terms
    const searchMappings: Record<string, string> = {
      'Central-Big C-Lotus': 'Central Festival Phuket',
      'Tesco Lotus Cherngtalay': 'Tesco Lotus Cherng Talay Phuket',
      'Big C Kamala': 'Big C Kamala Phuket',
      'Karon Circle': 'Karon Circle Phuket',
      'Kata Night Plaza': 'Kata Night Plaza Phuket',
      'Surakul Stadium': 'Surakul Stadium Phuket Town',
      'Rung Hill': 'Khao Rang Hill Phuket',
      'Patong Provincial Electricity Authority': 'Patong Provincial Electricity Authority Phuket'
    };
    
    return searchMappings[stopName] || `${stopName} Phuket`;
  };

  // Function to open Google Maps
  const openGoogleMaps = (stopName: string) => {
    const searchTerm = getGoogleMapsSearchTerm(stopName);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchTerm)}`;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'nofollow noopener noreferrer';
    link.click();
  };
  
  const { data: routes = [], isLoading } = useQuery<BusRoute[]>({
    queryKey: ["/api/routes"],
  });

  const handleDirectionChange = (routeId: string, direction: 'outbound' | 'inbound') => {
    setSelectedDirections(prev => ({ ...prev, [routeId]: direction }));
  };

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

  const generateTransitSchemas = (route: BusRoute, language: 'en' | 'th') => {
    const baseUrl = 'https://phuketbusroutes.com';
    const schemas: Array<Record<string, any>> = [];
    
    const createStopItinerary = (stops: BusStop[], isReversed: boolean = false) => {
      const orderedStops = isReversed ? [...stops].reverse() : stops;
      return orderedStops.map((stop, index) => ({
        "@type": "BusStop",
        "name": language === 'th' ? stop.th : stop.en,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Phuket",
          "addressRegion": language === 'th' ? 'ภูเก็ต' : 'Phuket',
          "addressCountry": "TH"
        }
      }));
    };
    
    if (route.schedules?.outbound?.available) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BusTrip",
        "@id": `${baseUrl}/#route-${route.routeId}-outbound`,
        "name": language === 'th' 
          ? `เส้นทาง ${route.routeId} (จากสนามบิน)` 
          : `Route ${route.routeId} (From Airport)`,
        "description": language === 'th' ? route.description?.th : route.description?.en,
        "provider": {
          "@type": "Organization",
          "name": language === 'th' ? route.name?.th : route.name?.en
        },
        "busNumber": route.routeId,
        "itinerary": {
          "@type": "ItemList",
          "itemListElement": createStopItinerary(route.stops, false)
        },
        "departureBusStop": {
          "@type": "BusStop",
          "name": language === 'th' ? route.stops[0]?.th : route.stops[0]?.en,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Phuket",
            "addressCountry": "TH"
          }
        },
        "arrivalBusStop": {
          "@type": "BusStop",
          "name": language === 'th' 
            ? route.stops[route.stops.length - 1]?.th 
            : route.stops[route.stops.length - 1]?.en,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Phuket",
            "addressCountry": "TH"
          }
        },
        "departureTime": route.schedules.outbound.times,
        "offers": {
          "@type": "Offer",
          "price": "100",
          "priceCurrency": "THB",
          "availability": "https://schema.org/InStock",
          "description": language === 'th' 
            ? "ค่าโดยสารเหมาจ่าย สำหรับทุกเส้นทาง"
            : "Flat fare for all routes"
        }
      });
    }
    
    if (route.schedules?.inbound?.available) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BusTrip",
        "@id": `${baseUrl}/#route-${route.routeId}-inbound`,
        "name": language === 'th' 
          ? `เส้นทาง ${route.routeId} (ไปสนามบิน)` 
          : `Route ${route.routeId} (To Airport)`,
        "description": language === 'th' ? route.description?.th : route.description?.en,
        "provider": {
          "@type": "Organization",
          "name": language === 'th' ? route.name?.th : route.name?.en
        },
        "busNumber": route.routeId,
        "itinerary": {
          "@type": "ItemList",
          "itemListElement": createStopItinerary(route.stops, true)
        },
        "departureBusStop": {
          "@type": "BusStop",
          "name": language === 'th' 
            ? route.stops[route.stops.length - 1]?.th 
            : route.stops[route.stops.length - 1]?.en,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Phuket",
            "addressCountry": "TH"
          }
        },
        "arrivalBusStop": {
          "@type": "BusStop",
          "name": language === 'th' ? route.stops[0]?.th : route.stops[0]?.en,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Phuket",
            "addressCountry": "TH"
          }
        },
        "departureTime": route.schedules.inbound.times,
        "offers": {
          "@type": "Offer",
          "price": "100",
          "priceCurrency": "THB",
          "availability": "https://schema.org/InStock",
          "description": language === 'th' 
            ? "ค่าโดยสารเหมาจ่าย สำหรับทุกเส้นทาง"
            : "Flat fare for all routes"
        }
      });
    }
    
    return schemas;
  };

  return (
    <section className="py-8 bg-gray-50" data-section="detailed-schedules">
      {routes.flatMap((route: BusRoute) => 
        generateTransitSchemas(route, language).map((schema, index) => (
          <script 
            key={`schema-${route.routeId}-${index}-${language}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(schema) 
            }}
          />
        ))
      )}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-6">{t('schedules.title')}</h2>

        <div className="space-y-6">
          {routes.map((route: BusRoute) => (
            <Card key={route.routeId} className="shadow-lg overflow-hidden transition-all duration-300" data-route-id={route.routeId}>
              <div className={`${getRouteHeaderClass(route.routeId)} text-white p-4`}>
                <div className="flex items-center justify-between">
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
                  
                  {/* Social Media Link */}
                  {(() => {
                    let facebookUrl = '';
                    if (route.routeId === 'P1') facebookUrl = 'https://www.facebook.com/PhuketSmartBus';
                    if (route.routeId === 'P2') facebookUrl = 'https://www.facebook.com/airportbusphuket/';
                    if (route.routeId === 'P3') facebookUrl = 'https://www.facebook.com/Phuketbusexpress';
                    
                    return facebookUrl ? (
                      <a
                        href={facebookUrl}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="flex items-center text-white/80 hover:text-white text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-full transition-all duration-200"
                        title="Follow for updates"
                      >
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <ExternalLink className="w-2 h-2" />
                      </a>
                    ) : null;
                  })()}
                </div>
              </div>

              <CardContent className="p-4">
                <div className="grid lg:grid-cols-2 gap-6 lg:min-h-[300px]">
                  {/* Route Stops */}
                  <div className="flex flex-col">
                    <h4 className="text-base font-semibold mb-3 flex items-center text-gray-900">
                      <Route className="w-4 h-4 mr-2 text-ocean" />
                      Route Stops
                    </h4>
                    <div className="flex-1 space-y-2">
                      {(() => {
                        const selectedDirection = selectedDirections[route.routeId] || 'outbound';
                        const stops = route.stops as BusStop[];
                        // Reverse stops order for inbound direction
                        const displayStops = route.schedules && selectedDirection === 'inbound' && route.schedules.inbound?.available 
                          ? [...stops].reverse() 
                          : stops;
                        
                        return displayStops?.map((stop, index) => (
                          <div 
                            key={`${selectedDirection}-${index}`} 
                            className="relative flex items-center p-3 bg-gradient-to-r from-white to-gray-50 border-2 border-gray-300 rounded-lg cursor-pointer hover:from-blue-50 hover:to-blue-100 hover:border-blue-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
                            onClick={() => openGoogleMaps(stop.en)}
                            title={`Click to view ${stop.en} on Google Maps`}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                openGoogleMaps(stop.en);
                              }
                            }}
                          >
                            {/* Route progression indicator */}
                            <div className="flex flex-col items-center mr-3 flex-shrink-0">
                              <div className={`w-4 h-4 ${getRouteStopClass(route.routeId)} rounded-full border-2 border-white shadow-md z-10 group-hover:scale-125 transition-transform duration-200`}></div>
                              {index < displayStops.length - 1 && (
                                <div className={`w-0.5 h-4 ${getRouteStopClass(route.routeId)} mt-1`}></div>
                              )}
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center">
                                <span className="text-xs font-bold text-gray-500 mr-2">#{index + 1}</span>
                                <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 group-hover:underline transition-all duration-200">{stop.en}</p>
                                <svg className="w-4 h-4 ml-2 text-blue-500 group-hover:text-blue-700 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <p className="text-xs text-gray-600 ml-6 group-hover:text-blue-700 transition-colors duration-200">{stop.th}</p>
                            </div>
                            <div className="flex items-center ml-2 text-gray-400 group-hover:text-blue-600 transition-colors duration-200">
                              <span className="text-xs font-medium mr-1 hidden group-hover:inline">View map</span>
                              <ExternalLink className="w-4 h-4" />
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* Departure Times */}
                  <div className="flex flex-col">
                    {(() => {
                      // Handle both old and new data structures
                      if (route.schedules) {
                        const selectedDirection = selectedDirections[route.routeId] || 'outbound';
                        const schedule = route.schedules[selectedDirection];
                        
                        return (
                          <>
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-base font-semibold flex items-center text-gray-900">
                                <Clock className="w-4 h-4 mr-2 text-ocean" />
                                Departure Times
                              </h4>
                              
                              {/* Integrated Direction Toggle */}
                              {route.schedules && route.schedules.inbound && (
                                <div className="flex bg-gray-100 rounded-lg p-1">
                                  <button
                                    onClick={() => handleDirectionChange(route.routeId, 'outbound')}
                                    className={`px-3 py-1 text-xs font-medium rounded transition-all duration-200 ${
                                      (selectedDirections[route.routeId] || 'outbound') === 'outbound'
                                        ? `${getRouteTimeClass(route.routeId)} shadow-sm`
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                                  >
                                    From Airport
                                  </button>
                                  <button
                                    onClick={() => handleDirectionChange(route.routeId, 'inbound')}
                                    className={`px-3 py-1 text-xs font-medium rounded transition-all duration-200 ${
                                      selectedDirections[route.routeId] === 'inbound'
                                        ? `${getRouteTimeClass(route.routeId)} shadow-sm`
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                                  >
                                    To Airport
                                  </button>
                                </div>
                              )}
                            </div>
                            
                            {schedule?.available ? (
                              <div className="flex-1 grid grid-cols-2 gap-2 content-start">
                                {schedule.times.map((time: string, index: number) => (
                                  <button 
                                    key={index} 
                                    onClick={() => openGoogleMapsDirections(route.routeId, selectedDirection, time)}
                                    className={`${getRouteTimeClass(route.routeId)} px-3 py-2 rounded text-center font-medium text-sm h-fit hover:opacity-90 transition-opacity cursor-pointer group`}
                                    title={`Open directions in Google Maps for ${time} departure`}
                                  >
                                    <span className="group-hover:underline">{time}</span>
                                    <ExternalLink className="w-3 h-3 ml-1 inline opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <div className="flex-1 flex items-center justify-center">
                                <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                                  <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                                  <p className="text-gray-600 font-medium">Schedule Not Available Yet</p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    We're working to get the departure times for this direction. Check back soon!
                                  </p>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      } else {
                        // Fallback for old data structure
                        const times = (route as any).times || [];
                        return (
                          <>
                            <h4 className="text-base font-semibold mb-3 flex items-center text-gray-900">
                              <Clock className="w-4 h-4 mr-2 text-ocean" />
                              Departure Times (from Airport)
                            </h4>
                            <div className="flex-1 grid grid-cols-2 gap-2 content-start">
                              {times.map((time: string, index: number) => (
                                <button 
                                  key={index} 
                                  onClick={() => openGoogleMapsDirections(route.routeId, 'outbound', time)}
                                  className={`${getRouteTimeClass(route.routeId)} px-3 py-2 rounded text-center font-medium text-sm h-fit hover:opacity-90 transition-opacity cursor-pointer group`}
                                  title={`Open directions in Google Maps for ${time} departure`}
                                >
                                  <span className="group-hover:underline">{time}</span>
                                  <ExternalLink className="w-3 h-3 ml-1 inline opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                              ))}
                            </div>
                          </>
                        );
                      }
                    })()}
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