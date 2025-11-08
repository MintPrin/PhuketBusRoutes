import { useState, useEffect } from "react";
import { Globe, Route, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // On mobile, use simpler logic to reduce scroll jank
      if (isMobile) {
        // Only hide when scrolling down past a larger threshold
        if (currentScrollY > lastScrollY && currentScrollY > 150) {
          if (isVisible) {
            setIsVisible(false);
          }
        } else if (currentScrollY < lastScrollY || currentScrollY < 50) {
          if (!isVisible) {
            setIsVisible(true);
          }
        }
      } else {
        // Desktop: original behavior
        if (currentScrollY < lastScrollY || currentScrollY < 50) {
          if (!isVisible) {
            setIsVisible(true);
          }
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          if (isVisible) {
            setIsVisible(false);
          }
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isVisible]);

  const handleLanguageSwitch = (newLanguage: 'en' | 'th') => {
    const currentPath = removeLanguagePrefix(location);
    const newPath = getLocalizedPath(currentPath, newLanguage);
    
    // Use window.location.href for reliable navigation
    window.location.href = newPath;
  };

  return (
    <nav className={`bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50 will-change-transform transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`} style={{ backfaceVisibility: 'hidden', perspective: '1000px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <svg className="w-8 h-8 text-ocean" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Phuket Bus Routes Logo">
              <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
            </svg>
            <h1 className="text-xl font-bold text-gray-900 hidden md:block">Phuket Bus Routes</h1>
            <h1 className="text-lg font-bold text-gray-900 hidden sm:block md:hidden">Phuket Bus Routes</h1>
            <h1 className="text-base font-bold text-gray-900 sm:hidden">Phuket Bus Routes</h1>
          </div>
          <div className="flex items-center space-x-4">
            <HelpModal />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-ocean">
                  <Globe className="w-4 h-4 mr-1" />
                  {t('nav.language')}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onSelect={() => handleLanguageSwitch('en')}
                  className={language === 'en' ? 'bg-gray-100' : ''}
                >
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onSelect={() => handleLanguageSwitch('th')}
                  className={language === 'th' ? 'bg-gray-100' : ''}
                >
                  🇹🇭 ไทย
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
