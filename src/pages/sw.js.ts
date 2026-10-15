import { LANGS, dict, langMeta, pathFor } from "../lib/i18n";
import { PAGES } from "../lib/pages";

/*
 * Offline support for travellers who land without data.
 * Stale-timetable guards, in order:
 *  1. Network first: online visitors always get the live page; the saved copy is only an offline fallback.
 *  2. Every deploy ships a new VERSION, and activating it deletes all older saved pages.
 *  3. Saved pages older than MAX_AGE_DAYS are never shown; the visitor gets a "connect to check" page instead.
 *  4. Any saved page shown offline carries a banner with the date it was saved.
 */
export function GET() {
  const version = String(Date.now());
  const pages = Object.fromEntries(LANGS.map((l) => [l.code, PAGES.map((p) => pathFor(l.code, p.slug))]));
  const text = Object.fromEntries(
    LANGS.map((l) => {
      const ui = dict(l.code).ui;
      return [l.code, { html: langMeta(l.code).htmlLang, title: ui.offlineTitle, saved: ui.offlineSaved, tooOld: ui.offlineTooOld, none: ui.offlineNone }];
    }),
  );
  const js = `// Generated at build time by src/pages/sw.js.ts. Do not edit.
const VERSION = ${JSON.stringify(version)};
const CACHE = "pbr-" + VERSION;
const MAX_AGE_DAYS = 14;
const NETWORK_TIMEOUT_MS = 6000;
const PAGES = ${JSON.stringify(pages)};
const TEXT = ${JSON.stringify(text)};

const langOf = (path) => (path.split("/")[1] in PAGES && path.split("/")[1] !== "en" ? path.split("/")[1] : "en");
const keyOf = (url) => (url.pathname.replace(/\\/$/, "") || "/");
const fill = (s, v) => s.replace(/\\{(\\w+)\\}/g, (_, k) => v[k]);
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) =>
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })()),
);

async function save(key, res) {
  const headers = new Headers(res.headers);
  headers.set("x-saved-at", String(Date.now()));
  const body = await res.blob();
  await (await caches.open(CACHE)).put(key, new Response(body, { status: res.status, headers }));
}

// The page asks us to save every page of its language (at most twice a day).
self.addEventListener("message", (e) => {
  if (e.data && e.data.type === "precache") e.waitUntil(precache(e.data.lang, e.data.assets || []));
});
async function precache(lang, assets) {
  const cache = await caches.open(CACHE);
  const stamp = "/__saved-" + lang;
  const last = await cache.match(stamp);
  if (last && Date.now() - Number(await last.text()) < 12 * 3600e3) return;
  for (const a of assets) {
    try { if (!(await cache.match(a))) await cache.add(a); } catch {}
  }
  for (const p of PAGES[lang] || []) {
    try {
      const res = await fetch(p, { cache: "no-cache" });
      if (res.ok) await save(p, res);
    } catch {}
  }
  await cache.put(stamp, new Response(String(Date.now())));
}

function fetchWithTimeout(req) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), NETWORK_TIMEOUT_MS);
  return fetch(req, { signal: ctrl.signal }).finally(() => clearTimeout(t));
}

function offlinePage(lang, message) {
  const t = TEXT[lang];
  const home = lang === "en" ? "/" : "/" + lang;
  return new Response(
    '<!doctype html><html lang="' + t.html + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' +
      esc(t.title) + '</title></head><body style="margin:0;background:#F3EDDF;color:#0E0E0E;font:17px/1.5 system-ui,sans-serif"><main style="max-width:36rem;margin:0 auto;padding:4rem 1.25rem"><h1 style="font:400 2.2rem/1.1 Georgia,serif">' +
      esc(t.title) + "</h1><p>" + esc(message) + '</p><p><a href="' + home + '" style="color:#B5301A">phuketbusroutes.com</a></p></main></body></html>',
    { status: 503, headers: { "content-type": "text/html; charset=utf-8" } },
  );
}

async function page(req) {
  const url = new URL(req.url);
  const key = keyOf(url);
  const lang = langOf(key);
  try {
    const res = await fetchWithTimeout(req);
    if (res.ok && (res.headers.get("content-type") || "").includes("text/html")) save(key, res.clone());
    return res;
  } catch {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(key);
    const t = TEXT[lang];
    if (!hit) return offlinePage(lang, fill(t.none, { days: MAX_AGE_DAYS }));
    const savedAt = Number(hit.headers.get("x-saved-at") || 0);
    if (Date.now() - savedAt > MAX_AGE_DAYS * 864e5) {
      await cache.delete(key);
      return offlinePage(lang, fill(t.tooOld, { days: MAX_AGE_DAYS }));
    }
    const date = new Intl.DateTimeFormat(t.html, { dateStyle: "medium" }).format(savedAt);
    const banner = '<div role="status" style="position:fixed;left:0;right:0;bottom:0;z-index:10001;background:#B5301A;color:#FAF6EC;padding:12px 16px;font:500 15px/1.4 system-ui,sans-serif">' +
      esc(fill(t.saved, { date })) + "</div>";
    const html = (await hit.text()).replace("<body>", "<body>" + banner);
    return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) cache.put(req, res.clone());
  return res;
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  if (req.mode === "navigate") return e.respondWith(page(req));
  if (url.pathname.startsWith("/_astro/") || url.pathname.startsWith("/og/")) return e.respondWith(cacheFirst(req));
});
`;
  return new Response(js, { headers: { "Content-Type": "text/javascript; charset=utf-8" } });
}
