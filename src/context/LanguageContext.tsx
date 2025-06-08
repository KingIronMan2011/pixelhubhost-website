import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '../i18n';

// Create the language context with default values
export const LanguageContext = createContext({
  language: 'en',
  setLanguage: (lang: string) => {},
});

// Provider component to wrap the app and provide language state/functions
export const LanguageProvider = ({ children }) => {
  // State for the current language, initialized from i18n
  const [language, setLanguageState] = useState(i18n.language || 'en');

  useEffect(() => {
    // Update state when i18n language changes
    const onLangChange = (lng: string) => setLanguageState(lng);
    i18n.on('languageChanged', onLangChange);
    return () => i18n.off('languageChanged', onLangChange);
  }, []);

  // Function to change the language using i18n
  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    // i18n will emit 'languageChanged', updating state
  };

  // Provide language state and setter to children components
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context in components
export const useLanguage = () => useContext(LanguageContext);
