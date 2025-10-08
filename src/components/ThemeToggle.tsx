import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// ThemeToggle component: toggles between light and dark mode
const ThemeToggle: React.FC = () => {
  // Get current theme and toggle function from context
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    // Animated button to toggle theme
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-xl border border-transparent bg-gray-800/60 hover:bg-gray-700/80 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={t('texts.toggleTheme')}
      whileFocus={{
        scale: 1.08,
        boxShadow: '0 8px 32px 0 rgba(251,191,36,0.13)',
        transition: { type: 'tween', duration: 0.13, ease: 'easeInOut' },
      }}
      whileHover={{
        scale: 1.08,
        boxShadow: '0 8px 32px 0 rgba(251,191,36,0.13)',
        transition: { type: 'tween', duration: 0.13, ease: 'easeInOut' },
      }}
      whileTap={{
        scale: 0.96,
        boxShadow: '0 4px 16px 0 rgba(251,191,36,0.10)',
        transition: { type: 'tween', duration: 0.13, ease: 'easeInOut' },
      }}
      type="button"
      style={{ willChange: 'transform, box-shadow' }}
    >
      {/* Visually hidden label for accessibility */}
      <span className="sr-only">{t('texts.toggleTheme')}</span>
      {/* Show sun icon (animated spin) if dark mode, or moon if light mode */}
      {theme === 'dark' ? (
        <motion.span>
          <Sun
            size={20}
            className="text-yellow-400"
            style={{ animation: 'spin 20s linear infinite' }}
          />
        </motion.span>
      ) : (
        <Moon size={20} className="text-blue-400" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
