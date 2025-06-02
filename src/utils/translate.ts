import { translations } from "../config/translations";

type Language = "en" | "fr" | "de" | "pt";

export const translate = (
  key: keyof typeof translations,
  language: Language
): string => {
  const entry = translations[key] as Record<Language, string>;
  if (!entry) return key;
  return entry[language] || entry["en"] || "";
};
