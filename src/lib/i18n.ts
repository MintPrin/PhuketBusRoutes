import en from "../i18n/en.json";
import th from "../i18n/th.json";
import ru from "../i18n/ru.json";
import zh from "../i18n/zh.json";
import ko from "../i18n/ko.json";
import ja from "../i18n/ja.json";
import de from "../i18n/de.json";
import fr from "../i18n/fr.json";

export const LANGS = [
  { code: "en", hreflang: "en", htmlLang: "en", og: "en_US" },
  { code: "th", hreflang: "th", htmlLang: "th", og: "th_TH" },
  { code: "ru", hreflang: "ru", htmlLang: "ru", og: "ru_RU" },
  { code: "zh", hreflang: "zh-Hans", htmlLang: "zh-Hans", og: "zh_CN" },
  { code: "ko", hreflang: "ko", htmlLang: "ko", og: "ko_KR" },
  { code: "ja", hreflang: "ja", htmlLang: "ja", og: "ja_JP" },
  { code: "de", hreflang: "de", htmlLang: "de", og: "de_DE" },
  { code: "fr", hreflang: "fr", htmlLang: "fr", og: "fr_FR" },
] as const;

export type Lang = (typeof LANGS)[number]["code"];
export type Dict = typeof en;

const DICTS = { en, th, ru, zh, ko, ja, de, fr } as Record<Lang, Dict>;

export const SITE = "https://phuketbusroutes.com";

export const dict = (lang: Lang): Dict => DICTS[lang];

export const langMeta = (lang: Lang) => LANGS.find((l) => l.code === lang)!;

/** Fill {placeholders}. A missing value throws, so a typo never ships as a literal "{fare}". */
export function fill(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => {
    if (!(k in vars)) throw new Error(`Missing placeholder {${k}} in: ${template}`);
    return String(vars[k]);
  });
}

/** Path for a page slug in a language. English has no prefix. */
export function pathFor(lang: Lang, slug: string): string {
  const prefix = lang === "en" ? "" : `/${lang}`;
  if (slug) return `${prefix}/${slug}`;
  return prefix || "/";
}

export const urlFor = (lang: Lang, slug: string) => `${SITE}${pathFor(lang, slug)}`;
