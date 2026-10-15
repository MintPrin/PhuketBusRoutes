import { LANGS, dict, fill, langMeta, urlFor } from "../lib/i18n";
import { slugOf } from "../lib/pages";
import { ROUTES, fareText, first, last, inboundStops, passesText, type Route } from "../lib/routes";
import { pageCopy } from "../lib/content";

// llms.txt (llmstxt.org) for AI assistants. Built from routes.json + en.json like the pages, so it can't drift.
const d = dict("en");

function routeBlock(r: Route): string {
  const copy = d.routes[r.id] as Record<string, string>;
  const out = r.stops.map((s) => s.en);
  const back = inboundStops(r).map((s) => s.en);
  const lines = [
    `### [${copy.name} (${r.id})](${urlFor("en", r.slug)})`,
    `- Line: ${copy.summary}`,
    `- Fare: ${fareText(r, "en")}${r.childFree ? `. ${fill(d.ui.childFree, { age: r.childFree })}` : ""}`,
  ];
  if (r.frequency) {
    lines.push(`- Service: ${fill(d.ui.every, { n: r.frequency.every })}, ${r.frequency.start}–${r.frequency.end}`);
  } else {
    lines.push(`- From ${out[0]}: first ${first(r, "outbound")}, last ${last(r, "outbound")}`);
    if (r.schedules.inbound) lines.push(`- From ${back[0]}: first ${first(r, "inbound")}, last ${last(r, "inbound")}`);
  }
  lines.push(`- Where to board: ${copy.boarding}`);
  if (r.fare.type !== "free") lines.push(`- Payment: ${r.payment.map((p) => (d.payment as Record<string, string>)[p] ?? p).join(", ")}`);
  if (r.dayPasses) lines.push(`- Day passes: ${passesText(r, "en")}`);
  for (const f of r.flags ?? []) lines.push(`- Note: ${fill(copy[f], { whatsapp: r.whatsapp ?? "" })}`);
  lines.push(`- Stops: ${out.join(" → ")}`);
  lines.push(`- Operator: ${r.operator.replace(/\.$/, "")}. Last verified ${r.lastVerified}.`);
  return lines.join("\n");
}

export function GET() {
  const verified = ROUTES.map((r) => r.lastVerified).sort().at(-1);
  const guides = (["patong", "map"] as const).map((k) => {
    const c = pageCopy(k, "en");
    return `- [${c.title}](${urlFor("en", slugOf(k))}): ${c.description}`;
  });
  const langs = LANGS.filter((l) => l.code !== "en").map(
    (l) => `- [${dict(l.code).lang.name}](${urlFor(l.code, "")}) (${langMeta(l.code).hreflang})`,
  );
  const txt = [
    `# ${d.site.name}`,
    "",
    `> ${d.home.description} ${d.ui.disclaimer} Data last verified ${verified}.`,
    "",
    "Prices are in Thai baht (฿). Times are the operators' published timetables; traffic can add delays.",
    "",
    "## Routes",
    "",
    ROUTES.map(routeBlock).join("\n\n"),
    "",
    "## Guides",
    "",
    ...guides,
    "",
    "## Other languages",
    "",
    ...langs,
    "",
    "## Optional",
    "",
    `- [Sitemap](${urlFor("en", "")}sitemap.xml): every page in all 8 languages`,
    "",
  ].join("\n");
  return new Response(txt, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
