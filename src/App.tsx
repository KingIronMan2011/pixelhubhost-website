import { Routes, Route, Navigate } from "react-router-dom";
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

function App() {
  const { loading } = useAuth();
  useTranslation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <span className="text-blue-600 dark:text-blue-300 font-semibold text-lg mt-2">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (config.underConstruction) {
    return <UnderConstruction />;
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
        <MetaTags />
        <Header />
        <main className="flex-grow">
          <Routes>
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
            <Route path="/under-construction" element={<UnderConstruction />} />
            {/* Add more routes as needed */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
