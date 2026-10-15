import { defineConfig } from "astro/config";

// ponytail: plain static build, no integrations. Sitemap + hreflang are generated in src/pages/sitemap.xml.ts.
export default defineConfig({
  site: "https://phuketbusroutes.com",
  trailingSlash: "never",
  build: { format: "directory" },
});
