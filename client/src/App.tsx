import { Switch, Route, useLocation, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { initSmoothScrolling } from "@/lib/smoothScroll";
import { useEffect } from "react";
import { getLanguageFromPath } from "@/i18n";
import { useSEO } from "@/hooks/useSEO";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function AppContent() {
  const [location] = useLocation();
  const currentLanguage = getLanguageFromPath(location);
  
  // Initialize SEO optimization
  useSEO();

  useEffect(() => {
    initSmoothScrolling();
  }, []);

  useEffect(() => {
    // Apply language class to body for font switching
    document.body.setAttribute('data-lang', currentLanguage);
  }, [currentLanguage]);

  return (
    <Switch>
      {/* Default English routes */}
      <Route path="/" component={Home} />
      
      {/* Thai language routes */}
      <Route path="/th" component={Home} />
      <Route path="/th/" component={Home} />
      
      {/* 404 fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter>
          <AppContent />
          <Toaster />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
