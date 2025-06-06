import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import languagesConfig from "../config/languages/Languages";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

// Infer the language keys from the config
type LanguageKey = keyof typeof languagesConfig;

// Animation for link hover (desktop)
const linkHover = {
  scale: 1.045,
  color: "#fff",
  transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
};

// Animation for mobile nav links (hover/tap)
const mobileLinkMotion = {
  whileHover: {
    scale: 1.04,
    color: "#fff",
    transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
  },
  whileTap: {
    scale: 1.04,
    color: "#a5b4fc",
    transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
  },
};

// Main Header component
const Header: React.FC = () => {
  // Get current language from context
  const { language } = useLanguage() as { language: LanguageKey };
  // Get translations for the current language, fallback to English
  const t = languagesConfig[language]?.texts || languagesConfig.en.texts;
  // State for mobile menu open/close
  const [menuOpen, setMenuOpen] = useState(false);

  // Navigation links (labels are translated)
  const navLinks = [
    { href: "#features", label: t.features },
    { href: "#pricing", label: t.pricing },
    { href: "#addons", label: t.addons },
    { href: "#contact", label: t.contact },
  ];

  return (
    // Header bar with fixed position and background
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md py-4 shadow transition-colors duration-500">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          {/* Logo (left side) */}
          <a
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-all duration-500"
          >
            PixelHub Host
          </a>
          {/* Desktop navigation links (center) */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-100 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
          {/* Right side: language selector, theme toggle, status/login buttons, mobile menu button */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
            {/* System status button (desktop only) */}
            <motion.a
              href="https://stats.uptimerobot.com/h2jzO5FroG"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow"
              whileHover={linkHover}
              whileFocus={linkHover}
              style={{ willChange: "transform, color" }}
            >
              {t.systemStatus}
            </motion.a>
            {/* Login/Signup button (desktop only) */}
            <motion.a
              href="https://dash.pixelhubhost.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium shadow"
              whileHover={linkHover}
              whileFocus={linkHover}
              style={{ willChange: "transform, color" }}
            >
              {t.loginSignup || "Login / Signup"}
            </motion.a>
            {/* Hamburger menu button (mobile only) */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none ml-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            >
              {/* Hamburger icon (animated to X when open) */}
              <span
                className={`block w-6 h-0.5 bg-white mb-1 rounded transition-all duration-500 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white mb-1 rounded transition-all duration-500 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-white rounded transition-all duration-500 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </button>
          </div>
        </nav>
        {/* Mobile menu dropdown (shows when menuOpen is true) */}
        {menuOpen && (
          <div className="md:hidden mt-4 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-lg p-5 space-y-3 animate-fade-in-down">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="block text-gray-100 font-medium"
                onClick={() => setMenuOpen(false)}
                {...mobileLinkMotion}
              >
                {link.label}
              </motion.a>
            ))}
            {/* System status button (mobile) */}
            <motion.a
              href="https://stats.uptimerobot.com/h2jzO5FroG"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-2 text-center shadow"
              whileHover={linkHover}
              whileTap={{ scale: 0.97, backgroundColor: "#2563eb" }}
              style={{ willChange: "transform, color, background-color" }}
              onClick={() => setMenuOpen(false)}
            >
              {t.systemStatus}
            </motion.a>
            {/* Login/Signup button (mobile) */}
            <motion.a
              href="https://dash.pixelhubhost.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium mt-2 text-center shadow"
              whileHover={linkHover}
              whileTap={{ scale: 0.97, backgroundColor: "#7c3aed" }}
              style={{ willChange: "transform, color, background-color" }}
              onClick={() => setMenuOpen(false)}
            >
              {t.loginSignup || "Login / Signup"}
            </motion.a>
          </div>
        )}
      </div>
      {/* Animation for mobile menu dropdown */}
      <style>
        {`
          .animate-fade-in-down {
            animation: fadeInDown 0.25s cubic-bezier(.4,0,.2,1);
          }
          @keyframes fadeInDown {
            0% { opacity: 0; transform: translateY(-16px);}
            100% { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </header>
  );
};

export default Header;
