import { LANGS, urlFor } from "../lib/i18n";
import { PAGES } from "../lib/pages";
import { ROUTES } from "../lib/routes";

// One <url> per language version, each listing every alternate (Google's hreflang-in-sitemap format).
export function GET() {
  const lastmod = ROUTES.map((r) => r.lastVerified).sort().at(-1);
  const urls = PAGES.flatMap((p) =>
    LANGS.map(({ code }) => {
      const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${urlFor(l.code, p.slug)}"/>`).join("\n");
      return `  <url>\n    <loc>${urlFor(code, p.slug)}</loc>\n${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor("en", p.slug)}"/>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    }),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
