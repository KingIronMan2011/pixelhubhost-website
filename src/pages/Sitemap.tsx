import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import languages from "../config/languages/Languages";
import MetaTags from "../components/MetaTags";

// List of sitemap links with route paths and translation keys for labels
const sitemapLinks = [
  { path: "/", labelKey: "home" },
  { path: "/aboutus", labelKey: "aboutUsTitle" },
  { path: "/privacy", labelKey: "privacyPolicy" },
  { path: "/terms", labelKey: "termsOfService" },
  { path: "/legal", labelKey: "legal" },
  // Add more Minecraft hosting-related routes as needed
];

// Animation config for link hover/tap effects
const linkHover = {
  scale: 1.035,
  boxShadow: "0 8px 32px 0 rgba(59,130,246,0.10)",
  transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
};

// Sitemap page component displays a list of important site links
const Sitemap: React.FC = () => {
  // Use your custom language context
  const { language } = useLanguage();
  // Get the correct set of translated texts for the current language, fallback to English if missing
  const texts = languages[language]?.texts || languages.en.texts;

  return (
    <>
      <MetaTags
        title={texts.sitemap}
        description={texts.sitemapMinecraftNote}
      />
      <div className="max-w-lg mx-auto mt-24 mb-12 p-8 rounded-2xl shadow-xl bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800">
        {/* Page title, translated */}
        <h1
          className="font-extrabold text-3xl mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow"
          style={{ lineHeight: 1.18 }}
        >
          {texts.sitemap}
        </h1>
        {/* List of sitemap links, each with animation and translation */}
        <ul className="space-y-3">
          {sitemapLinks.map((link) => (
            <li key={link.path}>
              <motion.div
                whileHover={linkHover}
                whileFocus={linkHover}
                whileTap={linkHover}
                style={{ willChange: "transform, box-shadow" }}
              >
                <Link
                  to={link.path}
                  className="block px-5 py-3 rounded-xl font-medium text-base text-blue-700 dark:text-blue-300 bg-blue-50/60 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-200 shadow-sm"
                >
                  {typeof texts[link.labelKey as keyof typeof texts] ===
                  "string"
                    ? texts[link.labelKey as keyof typeof texts]
                    : (texts[link.labelKey as keyof typeof texts] as any)?.[
                        language
                      ] ||
                      (texts[link.labelKey as keyof typeof texts] as any)?.en ||
                      link.labelKey}
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
        {/* Additional note about Minecraft hosting, translated */}
        <div className="mt-10 text-center text-gray-500 dark:text-gray-400 text-sm">
          {texts.sitemapMinecraftNote}
        </div>
      </div>
    </>
  );
};

export default Sitemap;
