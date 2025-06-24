import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useTranslation } from 'react-i18next';
import MetaTags from './components/MetaTags';
import { LanguageProvider } from './context/LanguageContext';
import { config } from './config/config';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import TestServer from './components/TestServer';
import Features from './components/Features';
import PricingPlans from './components/PricingPlans';
import Addons from './components/Addons';
import Contact from './components/Contact';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, lazy, useEffect } from 'react';
import { useGoogleAnalytics } from './analytics';
import i18n from './i18n';

// Lazy load large pages
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Legal = lazy(() => import('./pages/Legal'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const NotFound = lazy(() => import('./pages/NotFound'));
const UnderConstruction = lazy(() => import('./pages/UnderConstruction'));

// Disable external services based on environment variable
const disableExternalServices = import.meta.env.VITE_DISABLE_EXTERNAL_SERVICES === 'true';

// Main App component that sets up routing, layout, and global providers
function App() {
  useGoogleAnalytics();
  // Get authentication loading state from AuthContext
  const { loading } = useAuth();

  // Initialize translations (i18next)
  // useTranslation returns an instance with the "t()" function
  const { t } = useTranslation();

  // Get current location for routing
  const location = useLocation();

  // Keep <html> lang attribute in sync with the current i18n language
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Show a loading spinner while authentication state is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
        <div className="flex flex-col items-center">
          <div
            className="rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4 animate-spin"
            style={{
              borderTopColor: '#3b82f6',
              borderBottomColor: '#3b82f6',
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderWidth: '4px',
              borderStyle: 'solid',
            }}
          />
          <span className="text-blue-600 dark:text-blue-300 font-semibold text-lg mt-2">
            {t('texts.loadingPage')}
          </span>
        </div>
      </div>
    );
  }

  // If the site is in under construction mode, show the UnderConstruction page only
  if (config.underConstruction) {
    return <UnderConstruction />;
  }

  // Main app layout and routing
  return (
    // Provide language context to all children
    <LanguageProvider>
      <HelmetProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
          {/* Set up meta tags for SEO and social sharing */}
          <MetaTags />
          {/* Site header/navigation */}
          <Header />
          {/* Main content area with route-based rendering */}
          <main className="flex-grow">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes location={location}>
                <Route
                  path="/"
                  element={
                    <>
                      <Hero />
                      {!disableExternalServices && <TestServer />}
                      <Features />
                      <PricingPlans />
                      <Addons />
                      <Contact />
                    </>
                  }
                />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/not-found" element={<NotFound />} />
                {/* Catch-all route for under construction page */}
                <Route path="/under-construction" element={<UnderConstruction />} />

                {/* Example route to display the icon file */}
                <Route
                  path="pixel_hub_host.png"
                  element={<img src="/pixel_hub_host.png" alt="PixelHubHost Logo" />}
                />

                {/* Show custom not found page for unknown routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          {/* Site footer */}
          <Footer />
        </div>
      </HelmetProvider>
    </LanguageProvider>
  );
}

export default App;
