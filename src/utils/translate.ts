import languagesConfig from "../config/languages/Languages";
import type { Language } from "../config/config"; // Use your app’s existing Language type

// Infer all possible translation keys from the English texts object
type TranslationKey = keyof typeof languagesConfig.en.texts;

// Utility function to get a translated string for a given key and language
export const translate = (key: TranslationKey, language: Language): string => {
  // Try to get the translation for the given language; fallback to English if missing
  const entry =
    (languagesConfig[language]?.texts as Record<TranslationKey, string>)?.[key] ?? languagesConfig.en.texts?.[key];
  // If no translation is found, return the key itself as a fallback
  if (!entry) return key;
  return entry;
};
