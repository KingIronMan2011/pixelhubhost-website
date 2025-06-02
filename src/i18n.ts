import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { translations } from "./config/translations";
import type { Language } from "./config/types";

const supportedLanguages: Language[] = ["en", "pt", "de", "fr"];

const resources = Object.fromEntries(
  supportedLanguages.map((lang) => [
    lang,
    {
      translation: Object.fromEntries(
        Object.entries(translations).map(([key, value]) => [
          key,
          (value as Record<Language, string>)[lang],
        ])
      ),
    },
  ])
);

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
