import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import languagesConfig from "../config/languages/Languages";
import { motion } from "framer-motion";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const texts =
    languagesConfig[language as keyof typeof languagesConfig]?.texts ||
    languagesConfig.en.texts;

  // Framer Motion hover animation for the toggle button
  const buttonHover = {
    scale: 1.08,
    boxShadow: "0 8px 32px 0 rgba(251,191,36,0.13)",
    transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
  };

  // Framer Motion for icon rotation (for dark mode sun)
  const iconSpin = {
    animate: { rotate: 360 },
    transition: { repeat: Infinity, duration: 15, ease: "linear" },
  };

  // Framer Motion hover/tap animation for the toggle button (mobile and desktop)
  const buttonMotion = {
    whileHover: buttonHover,
    whileFocus: buttonHover,
    whileTap: {
      scale: 0.96,
      boxShadow: "0 4px 16px 0 rgba(251,191,36,0.10)",
      transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
    },
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-xl border border-transparent bg-gray-800/60 hover:bg-gray-700/80 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={texts.toggleTheme || "Toggle theme"}
      {...buttonMotion}
      type="button"
      style={{ willChange: "transform, box-shadow" }}
    >
      <span className="sr-only">{texts.toggleTheme || "Toggle theme"}</span>
      {theme === "dark" ? (
        <motion.span {...iconSpin}>
          <Sun size={20} className="text-yellow-400" />
        </motion.span>
      ) : (
        <Moon size={20} className="text-blue-400" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
