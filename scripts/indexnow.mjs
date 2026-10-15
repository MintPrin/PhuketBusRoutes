// Tells Bing, Yandex, Naver (IndexNow) about every URL in the live sitemap. Run after a deploy: node scripts/indexnow.mjs
// The key is public by design; it only proves we own the site. Key file: public/5f8227731c46638b72fca8c44330fd90.txt
const KEY = "5f8227731c46638b72fca8c44330fd90";
const HOST = "phuketbusroutes.com";
const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${urlList.length} URLs → HTTP ${res.status}`);
if (!res.ok && res.status !== 202) process.exit(1);
