import { useState, useEffect } from "react";
import { Globe, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { getLocalizedPath, removeLanguagePrefix } from "@/i18n";
import HelpModal from "@/components/FeatureGuide";

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [location, setLocation] = useLocation();
  const { t, language } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        if (!isVisible) {
          setIsVisible(true);
        }
      } 
      // Hide navbar when scrolling down and past threshold
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        if (isVisible) {
          setIsVisible(false);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isVisible]);

  const handleLanguageSwitch = () => {
    const currentPath = removeLanguagePrefix(location);
    const newLanguage = language === 'en' ? 'th' : 'en';
    const newPath = getLocalizedPath(currentPath, newLanguage);
    setLocation(newPath);
  };

  return (
    <nav className={`bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <svg className="w-8 h-8 text-ocean" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
            </svg>
            <h1 className="text-xl font-bold text-gray-900 hidden md:block">Phuket Bus Routes</h1>
            <h1 className="text-lg font-bold text-gray-900 hidden sm:block md:hidden">Phuket Bus Routes</h1>
            <h1 className="text-base font-bold text-gray-900 sm:hidden">Phuket Bus Routes</h1>
          </div>
          <div className="flex items-center space-x-4">
            <HelpModal />
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-700 hover:text-ocean"
              onClick={handleLanguageSwitch}
            >
              <Globe className="w-4 h-4 mr-1" />
              {t('nav.language')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
