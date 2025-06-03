import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { Language } from "../config/config";

const supportedLanguages: Language[] = ["en", "pt", "de", "fr", "it"];

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "pt";
  try {
    const stored = localStorage.getItem("preferred-language");
    if (stored && supportedLanguages.includes(stored as Language))
      return stored as Language;
    const browserLang = navigator.language?.split?.("-")[0];
    return supportedLanguages.includes(browserLang as Language)
      ? (browserLang as Language)
      : "pt";
  } catch {
    return "pt";
  }
};

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    try {
      localStorage.setItem("preferred-language", language);
    } catch {}
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
