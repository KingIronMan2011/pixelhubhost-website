import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { useLanguage } from '../context/LanguageContext';
import languages from '../config/languages/Languages';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Infer the language keys from the config
type LanguageKey = keyof typeof languages;

// Animation for link hover (desktop)
const linkHover = {
  scale: 1.045,
  color: '#fff',
  transition: { type: 'tween', duration: 0.13, ease: 'easeInOut' },
};

// Animation for mobile nav links (hover/tap)
const mobileLinkMotion = {
  whileHover: {
    scale: 1.04,
    color: '#fff',
    transition: { type: 'tween', duration: 0.13, ease: 'easeInOut' },
  },
  whileTap: {
    scale: 1.04,
    color: '#a5b4fc',
    transition: { type: 'tween', duration: 0.13, ease: 'easeInOut' },
  },
};

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage() as { language: LanguageKey };

  // Detect browser language on mount if not set or not supported
  useEffect(() => {
    if (!language || !languages[language]) {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang && languages[browserLang as LanguageKey] && i18n.language !== browserLang) {
        i18n.changeLanguage(browserLang);
      }
    }
  }, [language]);

  // State for mobile menu open/close
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/#home';

  // Navigation links (labels are translated)
  const navLinks = [
    { href: '#features', label: t('texts.features') },
    { href: '#pricing', label: t('texts.pricing') },
    { href: '#addons', label: t('texts.addons') },
    { href: '#contact', label: t('texts.contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md py-4 shadow transition-colors duration-500">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          {/* Logo (left side) */}
          <a
            href={isHome ? '#home' : '/'}
            className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-all duration-500"
            aria-label="PixelHub Host"
          >
            <img
              src="/web-app-manifest-512x512.png"
              alt="PixelHub Host Logo"
              className="h-8 w-auto"
            />
            {t('brand')}
          </a>

          {/* Desktop navigation links (center) */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-gray-100 font-medium">
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
              style={{ willChange: 'transform, color' }}
            >
              {t('systemStatus')}
            </motion.a>
            {/* Login/Signup button (desktop only) */}
            <motion.a
              href="https://dash.pixelhubhost.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium shadow"
              whileHover={linkHover}
              whileFocus={linkHover}
              style={{ willChange: 'transform, color' }}
            >
              {t('loginSignup')}
            </motion.a>
            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {/* Simple large "Menu" text or an icon can be used here */}☰
            </button>
          </div>
        </nav>

        {/* Mobile navigation menu (shown/hidden with state) */}
        {menuOpen && (
          <motion.div
            className="mt-4 bg-gray-900 rounded-lg p-4 md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="block text-gray-200 py-2 font-medium"
                variants={mobileLinkMotion}
                whileHover="whileHover"
                whileTap="whileTap"
                onClick={() => setMenuOpen(false)}
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
              whileTap={{ scale: 0.97, backgroundColor: '#2563eb' }}
              style={{ willChange: 'transform, color, background-color' }}
              onClick={() => setMenuOpen(false)}
            >
              {t('systemStatus')}
            </motion.a>
            {/* Login/Signup button (mobile) */}
            <motion.a
              href="https://dash.pixelhubhost.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium mt-2 text-center shadow"
              whileHover={linkHover}
              whileTap={{ scale: 0.97, backgroundColor: '#7c3aed' }}
              style={{ willChange: 'transform, color, background-color' }}
              onClick={() => setMenuOpen(false)}
            >
              {t('loginSignup')}
            </motion.a>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
