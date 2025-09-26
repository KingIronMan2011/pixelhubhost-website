import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { Analytics } from '@vercel/analytics/react';

// Get the root DOM element where the React app will mount
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Render the React app with all necessary providers and context wrappers
createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <App />
            <Analytics />
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
);
