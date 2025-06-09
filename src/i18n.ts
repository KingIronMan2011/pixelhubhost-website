import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import languages from './config/languages/Languages';

// Helper to flatten nested translation objects into dot notation keys
function flattenTranslations(obj: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(result, flattenTranslations(value, newKey));
      } else {
        result[newKey] = value;
      }
    }
  }
  return result;
}

// Build the resources object for i18next using all language configs
const resources = Object.fromEntries(
  Object.entries(languages).map(([lang, data]) => {
    const flatTranslations = flattenTranslations(data);
    return [lang, { translation: flatTranslations }];
  }),
);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['navigator', 'localStorage', 'htmlTag'],
      lookupLocalStorage: 'preferred-language',
      caches: ['localStorage'],
    },
    supportedLngs: Object.keys(languages),
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    debug: false,
  });

export default i18n;
