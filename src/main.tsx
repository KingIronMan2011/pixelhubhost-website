import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { Analytics } from '@vercel/analytics/react';

// Get the root DOM element where the React app will mount
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Render the React app with all necessary providers and context wrappers
createRoot(rootElement).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <HelmetProvider>
        <ThemeProvider>
          <Router>
            <App />
            <Analytics />
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </I18nextProvider>
  </StrictMode>,
);
