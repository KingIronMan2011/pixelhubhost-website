import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Theme } from '../config/config';

// Helper to determine the initial theme (light/dark)
// - Checks localStorage for saved theme
// - If not found, uses system preference
const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'; // Default to light on server
  const saved = localStorage.getItem('theme') as Theme;
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Type for the theme context value
type ThemeContextType = {
  theme: Theme; // Current theme ("light" or "dark")
  toggleTheme: () => void; // Function to toggle theme
};

// Create the theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component to wrap the app and provide theme state/functions
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // State for the current theme, initialized from helper
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // When theme changes, update <html> class and save to localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle between light and dark theme
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  // Provide theme state and toggle function to children components
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// Custom hook to use the theme context in components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
