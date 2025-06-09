import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'; // Import the provider

// Ensure you have VITE_RECAPTCHA_V3_SITE_KEY in your .env file
const RECAPTCHA_V3_SITE_KEY = import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY;

if (!RECAPTCHA_V3_SITE_KEY) {
  console.warn(
    'reCAPTCHA v3 Site Key is not set. Please set VITE_RECAPTCHA_V3_SITE_KEY in your .env file.',
  );
}

// Get the root DOM element where the React app will mount
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Render the React app with all necessary providers and context wrappers
createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <GoogleReCaptchaProvider
              reCaptchaKey={RECAPTCHA_V3_SITE_KEY || 'YOUR_RECAPTCHA_KEY_NOT_SET_IN_ENV'} // Fallback, but ensure it's set
              scriptProps={{
                async: false, // Default recommended by the library for eager loading
                defer: false,
                appendTo: 'head',
              }}
            >
              <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <App />
              </Router>
            </GoogleReCaptchaProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
);
