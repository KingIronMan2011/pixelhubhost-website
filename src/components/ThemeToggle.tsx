import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl border border-transparent bg-gray-800/60 hover:bg-gray-700/80 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      {theme === "dark" ? (
        <Sun size={20} className="text-yellow-400 animate-spin-slow" />
      ) : (
        <Moon size={20} className="text-blue-400" />
      )}
      <style>
        {`
          .animate-spin-slow {
            animation: spin 15s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </button>
  );
};

export default ThemeToggle;
