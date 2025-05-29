// Google Maps URL utilities for route directions
export function createGoogleMapsDirectionsUrl(
  origin: string,
  destination: string,
  departureTime: string
): string {
  const now = new Date();
  const [hours, minutes] = departureTime.split(':').map(Number);
  
  // Create departure date
  let departureDate = new Date();
  departureDate.setHours(hours, minutes, 0, 0);
  
  // If the time has already passed today, set it for tomorrow
  if (departureDate <= now) {
    departureDate.setDate(departureDate.getDate() + 1);
  }
  
  // Convert to Unix timestamp (Google Maps expects seconds)
  const departureTimestamp = Math.floor(departureDate.getTime() / 1000);
  
  // Encode the location names for URL
  const encodedOrigin = encodeURIComponent(origin);
  const encodedDestination = encodeURIComponent(destination);
  
  // Create Google Maps directions URL
  const url = `https://www.google.com/maps/dir/${encodedOrigin}/${encodedDestination}/?travelmode=transit&departure_time=${departureTimestamp}`;
  
  return url;
}

// Get route endpoints for Google Maps
export function getRouteEndpoints(routeId: string, direction: 'outbound' | 'inbound') {
  const routeEndpoints = {
    P1: {
      outbound: {
        origin: 'Phuket International Airport, Thailand',
        destination: 'Rawai Beach, Phuket, Thailand'
      },
      inbound: {
        origin: 'Rawai Beach, Phuket, Thailand',
        destination: 'Phuket International Airport, Thailand'
      }
    },
    P2: {
      outbound: {
        origin: 'Phuket International Airport, Thailand',
        destination: 'Phuket Bus Terminal 1, Thailand'
      },
      inbound: {
        origin: 'Phuket Bus Terminal 1, Thailand',
        destination: 'Phuket International Airport, Thailand'
      }
    },
    P3: {
      outbound: {
        origin: 'Phuket International Airport, Thailand',
        destination: 'Kata Beach, Phuket, Thailand'
      },
      inbound: {
        origin: 'Kata Beach, Phuket, Thailand',
        destination: 'Phuket International Airport, Thailand'
      }
    }
  };

  return routeEndpoints[routeId as keyof typeof routeEndpoints]?.[direction];
}

// Open Google Maps directions in new tab/app
export function openGoogleMapsDirections(
  routeId: string,
  direction: 'outbound' | 'inbound',
  departureTime: string
) {
  const endpoints = getRouteEndpoints(routeId, direction);
  
  if (!endpoints) {
    console.error('Route endpoints not found for:', routeId, direction);
    return;
  }
  
  const url = createGoogleMapsDirectionsUrl(
    endpoints.origin,
    endpoints.destination,
    departureTime
  );
  
  // Open in new tab/app
  window.open(url, '_blank', 'noopener,noreferrer');
}