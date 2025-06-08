import languagesConfig from "../config/languages/Languages";
import i18n from "../i18n";
import type { Language } from "../config/config"; // Use your app’s existing Language type

// Infer all possible translation keys from the English texts object
type Texts = typeof languagesConfig.en.texts;
type TranslationKey = keyof Texts;

/**
 * Translates a key using the current i18n language or a provided language.
 * Falls back to English if the translation is missing.
 * If no translation is found, returns the key itself.
 */
export const translate = (key: TranslationKey, language?: Language): string => {
  // Use i18n.language if language is not provided
  const lang = language || (i18n.language as Language) || "en";
  const texts = languagesConfig[lang]?.texts as Texts | undefined;
  const entry = texts?.[key] ?? languagesConfig.en.texts?.[key];
  if (typeof entry !== "string") return key;
  return entry;
};
