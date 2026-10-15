// Guards translations against drift from en.json:
// same keys, same {placeholders}, same digits (times, fares, phone numbers), no empty strings.
import { readFileSync, readdirSync } from "node:fs";

const dir = new URL("../src/i18n/", import.meta.url);
const load = (f) => JSON.parse(readFileSync(new URL(f, dir), "utf8"));
const en = load("en.json");
const errors = [];

const walk = (a, b, path, lang) => {
  if (typeof a === "string") {
    if (typeof b !== "string" || !b.trim()) return errors.push(`${lang}: ${path} missing or empty`);
    const ph = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
    if (ph(a) !== ph(b)) errors.push(`${lang}: ${path} placeholders differ: "${ph(a)}" vs "${ph(b)}"`);
    const nums = (s) => (s.replace(/\{\w+\}/g, "").match(/\d+/g) ?? []).sort().join(",");
    if (nums(a) !== nums(b)) errors.push(`${lang}: ${path} numbers differ: [${nums(a)}] vs [${nums(b)}]`);
    return;
  }
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return errors.push(`${lang}: ${path} array length differs`);
    return a.forEach((x, i) => walk(x, b[i], `${path}[${i}]`, lang));
  }
  for (const k of Object.keys(a)) {
    if (!b || !(k in b)) { errors.push(`${lang}: ${path}.${k} missing`); continue; }
    walk(a[k], b[k], `${path}.${k}`, lang);
  }
  for (const k of Object.keys(b ?? {})) if (!(k in a)) errors.push(`${lang}: ${path}.${k} not in en`);
};

for (const f of readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "en.json")) {
  walk(en, load(f), "", f.replace(".json", ""));
}
if (errors.length) {
  console.error(`i18n check failed (${errors.length}):\n` + errors.slice(0, 60).join("\n"));
  process.exit(1);
}
console.log("i18n check ok");
