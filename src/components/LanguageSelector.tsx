import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';
import languagesConfig from '../config/languages/Languages';

type LanguagesConfigType = typeof languagesConfig;
type LanguageKey = keyof LanguagesConfigType;

// Use languageNames from the current language config for better integration
const getLanguageNames = (language: LanguageKey) => {
  return languagesConfig[language]?.texts.languageNames || languagesConfig.en.texts.languageNames;
};

const LanguageSelector = () => {
  // Get current language and setter from context
  const { language, setLanguage } = useLanguage();
  // State to control dropdown open/close
  const [isOpen, setIsOpen] = useState(false);
  // Ref for the dropdown container (used for outside click detection)
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get language names from config
  const languageNames = getLanguageNames(language);

  // On mount: load language from localStorage if available
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && savedLang !== language) {
      setLanguage(savedLang as any);
    }
     
  }, []);

  // Whenever language changes, persist it to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

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
    // Dropdown container
    <div className="relative" ref={dropdownRef}>
      {/* Button to open/close the language dropdown */}
      <button
        onClick={toggleDropdown}
        className={`flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isOpen ? 'bg-gray-800' : ''
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <Globe size={20} />
        <span className="font-medium">{languageNames[language]}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown menu with language options */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-2xl bg-gray-900 ring-1 ring-black ring-opacity-10 z-50 animate-fade-in-down">
          <div className="py-1" role="menu">
            {Object.entries(languageNames).map(([code, name]) => (
              <button
                key={code}
                onClick={() => {
                  setLanguage(code as any);
                  setIsOpen(false);
                }}
                className={`${
                  language === code
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                } block w-full text-left px-4 py-2 text-sm rounded transition-all duration-150`}
                role="menuitem"
                aria-current={language === code ? 'true' : undefined}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Animation for dropdown appearance */}
      <style>
        {`
          .animate-fade-in-down {
            animation: fadeInDownLang 0.18s cubic-bezier(.4,0,.2,1);
          }
          @keyframes fadeInDownLang {
            0% { opacity: 0; transform: translateY(-10px);}
            100% { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default LanguageSelector;
