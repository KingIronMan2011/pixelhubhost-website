import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import languages from './config/languages/Languages';

// Build the resources object for i18next using all language configs
// Each language's translations are flattened for i18next compatibility
const resources = Object.fromEntries(
  Object.entries(languages).map(([lang, data]) => [
    lang,
    { translation: flattenTranslations(data) },
  ]),
);

// Helper to flatten nested translation objects into dot notation keys
// Example: { a: { b: "c" } } => { "a.b": "c" }
function flattenTranslations(obj: any, prefix = ''): any {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(acc, flattenTranslations(value, newKey));
      } else {
        acc[newKey] = value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );
}

// Initialize i18next with language detection and React integration
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
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
    },
    () => {
      // Log the detected language after initialization
      console.log('i18n detected language:', i18n.language);
    },
  );

export default i18n;
