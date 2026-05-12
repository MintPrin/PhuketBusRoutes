import { useLocation } from "wouter";
import { getLanguageFromPath } from "@/i18n";

export default function Breadcrumbs() {
  const [location] = useLocation();
  const currentLanguage = getLanguageFromPath(location);

  const items = [
    {
      name: currentLanguage === "th" ? "หน้าแรก" : "Home",
      href: currentLanguage === "th" ? "/th/" : "/",
    },
  ];

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://phuketbusroutes.com${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <nav className="sr-only" aria-label="Breadcrumb">
        <ol>
          {items.map((item) => (
            <li key={item.name}>
              <a href={item.href}>{item.name}</a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
