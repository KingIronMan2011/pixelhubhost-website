import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext"; // Provides language context to the app
import "./i18n"; // Initializes i18next for translations
import "./index.css"; // Imports global and Tailwind CSS styles

// Get the root DOM element where the React app will mount
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Render the React app with all necessary providers and context wrappers
createRoot(rootElement).render(
  <StrictMode>
    {/* Enables React's strict mode for highlighting potential problems */}
    <BrowserRouter>
      {/* Enables client-side routing */}
      <HelmetProvider>
        {/* Provides support for managing document head (meta tags, title, etc.) */}
        <AuthProvider>
          {/* Provides authentication context (user, sign in/out, etc.) */}
          <ThemeProvider>
            {/* Provides theme context (light/dark mode) */}
            <LanguageProvider>
              {/* Provides language context (current language, switcher) */}
              <App />
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>
);
