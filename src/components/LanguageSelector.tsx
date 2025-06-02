import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Globe, ChevronDown } from "lucide-react";

const languageNames = {
  en: "English",
  pt: "Português",
  de: "Deutsch",
  fr: "Français",
};

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={`flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isOpen ? "bg-gray-800" : ""
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Globe size={20} />
        <span className="font-medium">{languageNames[language]}</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

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
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                } block w-full text-left px-4 py-2 text-sm rounded transition-all duration-150`}
                role="menuitem"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
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
