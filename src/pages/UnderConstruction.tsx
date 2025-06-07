import { useLanguage } from "../context/LanguageContext";
import { config, Language } from "../config/config";
import languagesConfig from "../config/languages/Languages";
import { motion } from "framer-motion";
import { FaDiscord, FaWhatsapp, FaEnvelope, FaCube } from "react-icons/fa";
import MetaTags from "../components/MetaTags";

const brand = config.name;
const contact = config.contact;
const website = config.website;

// UnderConstruction page component displays a maintenance/coming soon message
const UnderConstruction = () => {
  // Get current language and setter from context
  const { language, setLanguage } = useLanguage();
  // Get translated texts for the current language, fallback to English if missing
  const texts = languagesConfig[language]?.texts || languagesConfig.en.texts;

  // Framer Motion hover animation configs for contact buttons
  const buttonHover = {
    scale: 1.045,
    boxShadow: "0 8px 32px 0 rgba(59,130,246,0.13)",
    transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
  };
  const whatsappHover = {
    scale: 1.045,
    boxShadow: "0 8px 32px 0 rgba(16,185,129,0.13)",
    transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
  };
  const emailHover = {
    scale: 1.045,
    boxShadow: "0 8px 32px 0 rgba(59,130,246,0.07)",
    transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
  };

  return (
    <>
      <MetaTags
        title={texts.underConstruction}
        description={texts.constructionWorking}
      />
      {/* Main container with background and centered content */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 transition-colors duration-500">
        <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800 flex flex-col items-center max-w-lg w-full">
          {/* Brand/Logo with link to main website */}
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mb-2 group"
          >
            <FaCube size={28} className="text-indigo-500 drop-shadow" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow">
              {brand}
            </span>
          </a>
          {/* Construction emoji */}
          <span className="text-5xl mb-4 animate-pulse">🚧</span>
          {/* Main title */}
          <h1
            className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white text-center"
            style={{ lineHeight: 1.18 }}
          >
            {texts.underConstruction}
          </h1>
          {/* Subtitle and info */}
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-2">
            {texts.constructionWorking}
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 text-center mb-4">
            {texts.constructionCheckBack}
          </p>
          {/* Contact buttons: Discord, Email, WhatsApp */}
          <div className="flex gap-4 mb-4">
            {/* Discord button */}
            <motion.a
              href={contact.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow"
              whileHover={buttonHover}
              whileFocus={buttonHover}
              whileTap={{
                scale: 1.045,
                boxShadow: "0 8px 32px 0 rgba(16,185,129,0.13)",
                transition: {
                  type: "tween",
                  duration: 0.13,
                  ease: "easeInOut",
                },
              }} // mobile tap animation
              style={{ willChange: "transform, box-shadow" }}
            >
              <FaDiscord size={20} />
              Discord
            </motion.a>
            {/* Email button */}
            <motion.a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-5 py-2 rounded-lg font-medium border border-blue-200 dark:border-blue-900 hover:border-blue-400 dark:hover:border-blue-700 shadow transition-colors"
              whileHover={emailHover}
              whileFocus={emailHover}
              whileTap={{
                scale: 1.045,
                boxShadow: "0 8px 32px 0 rgba(16,185,129,0.13)",
                transition: {
                  type: "tween",
                  duration: 0.13,
                  ease: "easeInOut",
                },
              }} // mobile tap animation
              style={{ willChange: "transform, box-shadow" }}
            >
              <FaEnvelope size={20} />
              Email
            </motion.a>
            {/* WhatsApp button */}
            <motion.a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow"
              whileHover={whatsappHover}
              whileFocus={whatsappHover}
              whileTap={{
                scale: 1.045,
                boxShadow: "0 8px 32px 0 rgba(16,185,129,0.13)",
                transition: {
                  type: "tween",
                  duration: 0.13,
                  ease: "easeInOut",
                },
              }} // mobile tap animation
              style={{ willChange: "transform, box-shadow" }}
            >
              <FaWhatsapp size={20} />
              WhatsApp
            </motion.a>
          </div>
          {/* Language Switcher Dropdown */}
          <div className="flex items-center gap-2 mt-4">
            <label
              htmlFor="lang"
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {texts.constructionLanguage}:
            </label>
            <motion.div
              className="relative"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 4px 16px 0 rgba(59,130,246,0.10)",
              }}
              whileFocus={{
                scale: 1.03,
                boxShadow: "0 4px 16px 0 rgba(59,130,246,0.13)",
              }}
              style={{ willChange: "transform, box-shadow" }}
            >
              <select
                id="lang"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="appearance-none bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 pr-10 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 shadow-sm font-medium"
              >
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
                <option value="pt">Português</option>
                <option value="it">Italiano</option>
              </select>
              {/* Dropdown Arrow Icon */}
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 dark:text-blue-300">
                <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                  <path
                    d="M6 8l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.div>
          </div>
        </div>
        {/* Footer with brand and copyright */}
        <footer className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center flex items-center justify-center gap-1">
          <FaCube size={14} className="inline-block mb-0.5 text-indigo-400" />
          {new Date().getFullYear()} {brand}. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default UnderConstruction;
