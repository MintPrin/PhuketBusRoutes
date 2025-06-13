import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { getLanguageFromPath, type Language } from '@/i18n';

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  hreflang: Array<{ lang: string; href: string }>;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
}

export const useSEO = () => {
  const [location] = useLocation();
  const currentLanguage: Language = getLanguageFromPath(location);
  
  const getSEOData = (): SEOData => {
    const baseUrl = 'https://phuketbusroutes.com';
    const currentPath = location === '/th' ? '/' : location.replace('/th', '');
    
    const seoData: SEOData = {
      title: currentLanguage === 'th' 
        ? 'เส้นทางรถเมล์ภูเก็ต และตารางเวลา - คู่มือขนส่งสนามบิน'
        : 'Phuket Bus Routes & Schedules - Airport Transportation Guide',
      description: currentLanguage === 'th'
        ? 'ตารางเวลารถเมล์ภูเก็ตครบถ้วนจากสนามบินไปยังปาตอง กะรน กะตะ และเมืองภูเก็ต เส้นทาง P1, P2, P3 ตารางเวลา ค่าโดยสาร วางแผนเส้นทางอัจฉริยะ'
        : 'Complete Phuket bus schedules from airport to Patong, Karon, Kata beaches and Phuket Town. Route P1, P2, P3 timetables, fares. Smart route planner for tourists and locals.',
      keywords: currentLanguage === 'th'
        ? 'รถเมล์ภูเก็ต, รถเมล์สนามบิน, ขนส่งภูเก็ต, ตารางเวลารถเมล์, รถเมล์ปาตอง, รถเมล์กะรน, รถเมล์กะตะ, รถเมล์ไทย, ขนส่งสาธารณะ'
        : 'Phuket bus, airport bus, Phuket transportation, bus schedule, Patong bus, Karon bus, Kata bus, Thailand bus, public transport',
      canonical: currentLanguage === 'th' ? `${baseUrl}/th${currentPath}` : `${baseUrl}${currentPath}`,
      hreflang: [
        { lang: 'en', href: `${baseUrl}${currentPath}` },
        { lang: 'th', href: `${baseUrl}/th${currentPath === '/' ? '' : currentPath}` },
        { lang: 'x-default', href: `${baseUrl}${currentPath}` }
      ],
      ogTitle: currentLanguage === 'th'
        ? 'เส้นทางรถเมล์ภูเก็ต และตารางเวลา - คู่มือขนส่งสนามบิน'
        : 'Phuket Bus Routes & Schedules - Airport Transportation Guide',
      ogDescription: currentLanguage === 'th'
        ? 'ตารางเวลารถเมล์ภูเก็ตครบถ้วนจากสนามบินไปยังปาตอง กะรน กะตะ และเมืองภูเก็ต'
        : 'Complete Phuket bus schedules from airport to Patong, Karon, Kata beaches and Phuket Town.',
      ogUrl: currentLanguage === 'th' ? `${baseUrl}/th${currentPath}` : `${baseUrl}${currentPath}`
    };

    return seoData;
  };

  const updateSEOTags = (seoData: SEOData) => {
    // Update title
    document.title = seoData.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic meta tags
    updateMetaTag('description', seoData.description);
    updateMetaTag('keywords', seoData.keywords);

    // Open Graph tags
    updateMetaTag('og:title', seoData.ogTitle, true);
    updateMetaTag('og:description', seoData.ogDescription, true);
    updateMetaTag('og:url', seoData.ogUrl, true);
    updateMetaTag('og:locale', currentLanguage === 'th' ? 'th_TH' : 'en_US', true);

    // Twitter Card tags
    updateMetaTag('twitter:title', seoData.ogTitle);
    updateMetaTag('twitter:description', seoData.ogDescription);

    // Remove existing hreflang and canonical tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());
    document.querySelectorAll('link[rel="canonical"]').forEach(link => link.remove());

    // Add canonical link
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = seoData.canonical;
    document.head.appendChild(canonical);

    // Add hreflang links
    seoData.hreflang.forEach(({ lang, href }) => {
      const hreflang = document.createElement('link');
      hreflang.rel = 'alternate';
      hreflang.hreflang = lang;
      hreflang.href = href;
      document.head.appendChild(hreflang);
    });
  };

  useEffect(() => {
    const seoData = getSEOData();
    updateSEOTags(seoData);
  }, [location, currentLanguage]);

  return {
    currentLanguage,
    getSEOData
  };
};