import { useLocation } from 'wouter';
import { getTranslation, getLanguageFromPath, type Language, type TranslationKeys } from '@/i18n';

export const useTranslation = () => {
  const [location] = useLocation();
  const currentLanguage: Language = getLanguageFromPath(location);

  const t = (key: TranslationKeys): string | readonly string[] => {
    return getTranslation(currentLanguage, key);
  };

  return {
    t,
    language: currentLanguage,
    isRTL: false // Could be extended for RTL languages later
  };
};