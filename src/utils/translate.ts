import languagesConfig from '../config/languages/Languages';
import type { Language } from '../config/config'; // Use your app’s existing Language type

// Infer all possible translation keys from the English texts object
type Texts = typeof languagesConfig.en.texts;
type TranslationKey = keyof Texts;

export const translate = (key: TranslationKey, language: Language): string => {
  // Try to get the translation for the given language; fallback to English if missing
  const texts = languagesConfig[language]?.texts as Texts | undefined;
  const entry = texts?.[key] ?? languagesConfig.en.texts?.[key];
  // If no translation is found, return the key itself as a fallback
  if (typeof entry !== 'string') return key;
  return entry;
};
