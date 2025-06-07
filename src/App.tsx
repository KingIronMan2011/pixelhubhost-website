import { Routes, Route, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useTranslation } from "react-i18next";
import MetaTags from "./components/MetaTags";
import { LanguageProvider } from "./context/LanguageContext";
import { config } from "./config/config";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import TestServer from "./components/TestServer";
import Features from "./components/Features";
import PricingPlans from "./components/PricingPlans";
import Addons from "./components/Addons";
import Contact from "./components/Contact";
import UnderConstruction from "./pages/UnderConstruction";
import AboutUs from "./pages/AboutUs";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Legal from "./pages/Legal";
import Sitemap from "./pages/Sitemap";
import NotFound from "./pages/NotFound";
import { HelmetProvider } from "react-helmet-async";

// Main App component that sets up routing, layout, and global providers
function App() {
  // Get authentication loading state from AuthContext
  const { loading } = useAuth();
  // Initialize translations (i18next)
  useTranslation();
  // Get current location for routing
  const location = useLocation();

  // Show a loading spinner while authentication state is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
        <div className="flex flex-col items-center">
          <div
            className="rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4 animate-spin"
            style={{
              borderTopColor: "#3b82f6",
              borderBottomColor: "#3b82f6",
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderWidth: "4px",
              borderStyle: "solid",
            }}
          />
          <span className="text-blue-600 dark:text-blue-300 font-semibold text-lg mt-2">
            Loading...
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
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <TestServer />
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
              <Route
                path="/under-construction"
                element={<UnderConstruction />}
              />

              {/* Example route to display the icon file */}
              <Route
                path="android-chrome-512x512.png"
                element={
                  <img
                    src="/android-chrome-512x512.png"
                    alt="Android Chrome Icon"
                  />
                }
              />

              {/* Show custom not found page for unknown routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          {/* Site footer */}
          <Footer />
        </div>
      </HelmetProvider>
    </LanguageProvider>
  );
}

export default App;
