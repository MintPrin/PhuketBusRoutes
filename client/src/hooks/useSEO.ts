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
  structuredData: Array<Record<string, any>>;
}

export const useSEO = () => {
  const [location] = useLocation();
  const currentLanguage: Language = getLanguageFromPath(location);
  
  const getSEOData = (): SEOData => {
    const baseUrl = 'https://phuketbusroutes.com';
    const currentPath = location === '/th' ? '/' : location.replace('/th', '');
    
    const structuredData: Array<Record<string, any>> = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": currentLanguage === 'th' ? 'Phuket Bus Routes' : 'Phuket Bus Routes',
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`,
          "width": 512,
          "height": 512
        },
        "description": currentLanguage === 'th'
          ? 'คู่มือเส้นทางรถเมล์ภูเก็ตอิสระ - ข้อมูลตารางเวลาและเส้นทางรถเมล์สนามบินภูเก็ตที่ครบถ้วน'
          : 'Independent Phuket bus route guide - comprehensive schedules and route information for Phuket airport buses',
        "sameAs": []
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": currentLanguage === 'th' ? 'Phuket Bus Routes' : 'Phuket Bus Routes',
        "description": currentLanguage === 'th'
          ? 'คู่มือเส้นทางรถเมล์ภูเก็ต - ตารางเวลา ค่าโดยสาร และข้อมูลเส้นทาง'
          : 'Phuket Bus Routes Guide - schedules, fares, and route information',
        "publisher": {
          "@id": `${baseUrl}/#organization`
        },
        "inLanguage": [
          {
            "@type": "Language",
            "name": "English",
            "alternateName": "en"
          },
          {
            "@type": "Language", 
            "name": "Thai",
            "alternateName": "th"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": currentLanguage === 'th' ? `${baseUrl}/th${currentPath}#webpage` : `${baseUrl}${currentPath}#webpage`,
        "url": currentLanguage === 'th' ? `${baseUrl}/th${currentPath}` : `${baseUrl}${currentPath}`,
        "name": currentLanguage === 'th' 
          ? 'เส้นทางรถเมล์ภูเก็ต และตารางเวลา - คู่มือขนส่งสนามบิน'
          : 'Phuket Bus Routes & Schedules - Airport Transportation Guide',
        "isPartOf": {
          "@id": `${baseUrl}/#website`
        },
        "about": {
          "@type": "Service",
          "serviceType": currentLanguage === 'th' ? 'ข้อมูลรถเมล์สาธารณะ' : 'Public Bus Information',
          "provider": {
            "@id": `${baseUrl}/#organization`
          },
          "areaServed": {
            "@type": "City",
            "name": currentLanguage === 'th' ? 'ภูเก็ต' : 'Phuket',
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "TH",
              "addressRegion": currentLanguage === 'th' ? 'ภูเก็ต' : 'Phuket'
            }
          }
        },
        "description": currentLanguage === 'th'
          ? 'ตารางเวลารถเมล์ภูเก็ตครบถ้วนจากสนามบินไปยังปาตอง กะรน กะตะ และเมืองภูเก็ต'
          : 'Complete Phuket bus schedules from airport to Patong, Karon, Kata beaches and Phuket Town.',
        "inLanguage": currentLanguage === 'th' ? 'th-TH' : 'en-US'
      }
    ];
    
    const seoData: SEOData = {
      title: currentLanguage === 'th' 
        ? 'เส้นทางรถเมล์ภูเก็ต และตารางเวลา - คู่มือขนส่งสนามบิน'
        : 'Phuket Bus Routes & Schedules - Airport Transportation Guide',
      description: currentLanguage === 'th'
        ? 'ตารางเวลารถเมล์ภูเก็ตครบถ้วนจากสนามบินไปยังปาตอง กะรน กะตะ และเมืองภูเก็ต เส้นทาง P1, P2, P3 ตารางเวลา ค่าโดยสาร วางแผนเส้นทางอัจฉริยะ'
        : 'Complete Phuket bus schedules from airport to Patong, Karon, Kata beaches and Phuket Town. Route P1, P2, P3 timetables, fares. Smart route planner for tourists and locals.',
      keywords: currentLanguage === 'th'
        ? 'รถเมล์ภูเก็ต, เส้นทางรถเมล์ภูเก็ต, รถเมล์สนามบิน, ตารางเวลารถเมล์สนามบินภูเก็ต, แผนที่รถเมล์ภูเก็ต, รถเมล์ในภูเก็ต, รถเมล์ปาตอง, รถเมล์กะรน, รถเมล์กะตะ, ขนส่งสาธารณะภูเก็ต'
        : 'Phuket bus, phuket bus routes, phuket buses, buses in phuket, phuket airport bus timetable, phuket airport bus schedule, phuket bus map, bus phuket, airport bus phuket timetable, airport bus phuket schedule',
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
        : 'Complete Phuket bus schedules from airport to Patong, Koran, Kata beaches and Phuket Town.',
      ogUrl: currentLanguage === 'th' ? `${baseUrl}/th${currentPath}` : `${baseUrl}${currentPath}`,
      structuredData
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
    updateMetaTag('og:type', 'website', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
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

    // Remove existing structured data scripts
    document.querySelectorAll('script[type="application/ld+json"][data-seo-hook="true"]').forEach(script => script.remove());

    // Add structured data scripts
    seoData.structuredData.forEach((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-hook', 'true');
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
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