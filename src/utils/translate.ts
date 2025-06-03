import languagesConfig from "../config/languages/Languages";

type Language = "en" | "fr" | "de" | "pt";

// Infer the keys from the English texts object
type TranslationKey = keyof typeof languagesConfig.en.texts;

export const translate = (
  key: TranslationKey,
  language: Language
): string => {
  const entry = languagesConfig[language]?.texts?.[key] ?? languagesConfig.en.texts?.[key];
  if (!entry) return key;
  return entry;
};
