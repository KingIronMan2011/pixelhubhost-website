import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import languages from "./config/languages/Languages";

// Build the resources object for i18next using all language configs
// Each language's translations are flattened for i18next compatibility
const resources = Object.fromEntries(
  Object.entries(languages).map(([lang, data]) => [
    lang,
    { translation: flattenTranslations(data) },
  ])
);

// Helper to flatten nested translation objects into dot notation keys
// Example: { a: { b: "c" } } => { "a.b": "c" }
function flattenTranslations(obj: any, prefix = ""): any {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(acc, flattenTranslations(value, newKey));
    } else {
      acc[newKey] = value;
    }
    return acc;
  }, {} as Record<string, string>);
}

// Initialize i18next with language detection and React integration
i18n
  .use(LanguageDetector) // Detects user's preferred language (browser/localStorage)
  .use(initReactI18next) // Integrates with React
  .init({
    resources, // All translations for all supported languages
    fallbackLng: "en", // Fallback to English if translation is missing
    interpolation: { escapeValue: false }, // React already escapes values
    detection: {
      order: ["navigator", "localStorage", "htmlTag"], // Check browser first, then localStorage, then <html lang="">
      lookupLocalStorage: "preferred-language", // Key for localStorage
      caches: ["localStorage"], // Cache language preference in localStorage
    },
    supportedLngs: Object.keys(languages), // Only allow languages you provide
    nonExplicitSupportedLngs: true, // Match "en-US" to "en", etc.
    load: "languageOnly", // Only use base language code (e.g., "en" from "en-US")
  });

export default i18n;
