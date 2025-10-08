import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import i18n from '../i18n';
import languages from '../config/languages/Languages';

// Type definitions for languages
type LanguagesType = typeof languages;
type LanguageKey = keyof LanguagesType;

// Use languageNames from the current language config for better integration
const getLanguageNames = (language: LanguageKey) => {
  return languages[language]?.texts.languageNames || languages.en.texts.languageNames;
};

const LanguageSelector = () => {
  // Use i18n.language as the source of truth
  const [language, setLanguage] = useState<LanguageKey>((i18n.language as LanguageKey) || 'en');

  // State to control dropdown open/close
  const [isOpen, setIsOpen] = useState(false);
  // Ref for the dropdown container (used for outside click detection)
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get language names from config
  const languageNames = getLanguageNames(language);

  // Sync with i18n.language on mount and when it changes
  useEffect(() => {
    const syncLang = () => setLanguage(i18n.language as LanguageKey);
    i18n.on('languageChanged', syncLang);
    return () => {
      i18n.off('languageChanged', syncLang);
    };
  }, []);

  // Whenever language changes, update i18n and persist to localStorage
  const handleSetLanguage = (lang: LanguageKey) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside the component
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Keyboard accessibility: close dropdown on Escape key
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button to open/close the language dropdown */}
      <button
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md"
      >
        <Globe size={20} />
        <span className="font-medium">{languageNames[language]}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown menu with language options */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-2xl bg-gray-900 ring-1 ring-black ring-opacity-10 z-50 animate-fade-in-down-lang">
          <div className="py-1">
            {Object.entries(languageNames).map(([code, name]) => (
              <button
                key={code}
                onClick={() => handleSetLanguage(code as LanguageKey)}
                className={`${
                  language === code
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                } block w-full text-left px-4 py-2 text-sm rounded transition-all duration-150`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
