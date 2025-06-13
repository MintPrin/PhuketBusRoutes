import { useLocation } from 'wouter';
import { useTranslation } from '@/hooks/useTranslation';
import { getLanguageFromPath } from '@/i18n';

export default function Breadcrumbs() {
  const [location] = useLocation();
  const { t } = useTranslation();
  const currentLanguage = getLanguageFromPath(location);
  
  const breadcrumbItems = [
    {
      name: currentLanguage === 'th' ? 'หน้าแรก' : 'Home',
      href: currentLanguage === 'th' ? '/th/' : '/',
      current: true
    }
  ];

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://phuketbusroutes.com${item.href}`
    }))
  };

  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <nav className="bg-gray-50 border-b border-gray-200" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 py-2">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbItems.map((item, index) => (
                <li key={item.name} className="flex items-center">
                  {index > 0 && (
                    <svg className="flex-shrink-0 h-4 w-4 text-gray-400 mx-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {item.current ? (
                    <span className="text-gray-500 font-medium" aria-current="page">
                      {item.name}
                    </span>
                  ) : (
                    <a href={item.href} className="text-gray-900 hover:text-blue-600 font-medium">
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </nav>
    </>
  );
}