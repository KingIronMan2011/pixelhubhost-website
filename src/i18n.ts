import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import languages from "./config/languages/Languages";

const resources = Object.fromEntries(
  Object.entries(languages).map(([lang, data]) => [
    lang,
    { translation: flattenTranslations(data) },
  ])
);

// Helper to flatten nested objects (if needed)
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

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: ["navigator", "localStorage"],
      lookupLocalStorage: "preferred-language",
      caches: ["localStorage"],
    },
  });

export default i18n;
