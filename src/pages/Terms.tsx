import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { config } from "../config/config";
import languagesConfig from "../config/languages/Languages";

// Terms of Service page component displays the site's terms in the user's language
const Terms: React.FC = () => {
  // Get the current language from context
  const { language } = useLanguage();
  // Get the correct set of translated texts for the current language, fallback to English if missing
  const texts = languagesConfig[language]?.texts || languagesConfig.en.texts;

  return (
    // Main section with background and padding
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 px-4 pt-28 pb-24 overflow-y-auto">
      <div className="max-w-3xl mx-auto pb-8">
        {/* Page title, translated */}
        <h1
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          style={{ lineHeight: 1.18 }}
        >
          {texts.termsOfService}
        </h1>
        {/* Introductory terms statement */}
        <p className="mb-4 text-lg">{texts.tosIntro}</p>
        {/* Company name */}
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-300">
          {config.name}
        </h2>
        {/* List of main terms points */}
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>{texts.tosUsage}</li>
          <li>{texts.tosAccount}</li>
          <li>{texts.tosChanges}</li>
        </ul>
        {/* Contact/support info */}
        <p className="mb-4">{texts.tosContact}</p>
        {/* Discord/contact button with animation */}
        <div className="mt-8 text-center">
          <motion.a
            href={config.contact.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow"
            whileHover={{
              scale: 1.045,
              boxShadow: "0 8px 32px 0 rgba(59,130,246,0.13)",
              transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
            }}
            whileFocus={{
              scale: 1.045,
              boxShadow: "0 8px 32px 0 rgba(59,130,246,0.13)",
              transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
            }}
            whileTap={{
              scale: 1.045,
              boxShadow: "0 8px 32px 0 rgba(59,130,246,0.10)",
              transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
            }} // mobile tap animation
            style={{ willChange: "transform, box-shadow" }}
          >
            {texts.aboutUsContact}
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Terms;
