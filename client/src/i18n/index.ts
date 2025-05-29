import { en, type TranslationKeys } from './en';
import { th } from './th';

export type Language = 'en' | 'th';
export type { TranslationKeys };

const translations = {
  en,
  th
} as const;

// Development helper to check for missing translations
const checkMissingTranslations = (lang: Language): string[] => {
  const englishKeys = Object.keys(en);
  const langKeys = Object.keys(translations[lang]);
  return englishKeys.filter(key => !langKeys.includes(key));
};

// Get translation with fallback to English
export const getTranslation = (lang: Language, key: TranslationKeys): string | string[] => {
  const translation = translations[lang]?.[key] ?? translations.en[key];
  
  // In development, warn about missing translations
  if (import.meta.env.DEV && !translations[lang]?.[key] && lang !== 'en') {
    console.warn(`Missing translation for "${key}" in language "${lang}"`);
  }
  
  return Array.isArray(translation) ? [...translation] : translation;
};

// Development helper to log all missing translations
export const logMissingTranslations = (lang: Language): void => {
  if (import.meta.env.DEV) {
    const missing = checkMissingTranslations(lang);
    if (missing.length > 0) {
      console.warn(`Missing translations in ${lang}:`, missing);
    }
  }
};

// Helper to get language from URL path
export const getLanguageFromPath = (pathname: string): Language => {
  if (pathname.startsWith('/th/') || pathname === '/th') {
    return 'th';
  }
  return 'en'; // Default to English
};

// Helper to add language prefix to paths
export const getLocalizedPath = (path: string, lang: Language): string => {
  if (lang === 'en') {
    return path; // English is default, no prefix
  }
  return `/${lang}${path === '/' ? '' : path}`;
};

// Helper to remove language prefix from paths
export const removeLanguagePrefix = (pathname: string): string => {
  if (pathname.startsWith('/th/')) {
    return pathname.substring(3) || '/';
  }
  return pathname;
};