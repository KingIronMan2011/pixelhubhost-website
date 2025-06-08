import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Language } from '../config/config';

// List of supported language codes
const supportedLanguages: Language[] = ['en', 'pt', 'de', 'fr', 'it'];

// Helper to determine the initial language preference
const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'pt'; // Default to Portuguese on server
  try {
    // Try to get language from localStorage
    const stored = localStorage.getItem('preferred-language');
    if (stored && supportedLanguages.includes(stored as Language)) return stored as Language;
    // Fallback: try to use browser language if supported
    const browserLang = navigator.language?.split?.('-')[0];
    return supportedLanguages.includes(browserLang as Language) ? (browserLang as Language) : 'pt'; // Default to Portuguese if not supported
  } catch {
    return 'pt';
  }
};

// Type for the language context value
type LanguageContextType = {
  language: Language; // Current language code
  setLanguage: (language: Language) => void; // Function to change language
};

// Create the language context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component to wrap the app and provide language state/functions
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // State for the current language, initialized from helper
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  // Whenever language changes, save it to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('preferred-language', language);
    } catch {}
  }, [language]);

  // Provide language state and setter to children components
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context in components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
