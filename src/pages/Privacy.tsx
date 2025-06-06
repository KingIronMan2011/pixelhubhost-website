import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { config } from "../config/config";
import languagesConfig from "../config/languages/Languages";
import { motion } from "framer-motion";

// Privacy page component displays privacy policy and data protection info
const Privacy: React.FC = () => {
  // Get the current language from context
  const { language } = useLanguage();
  // Get the correct set of translated texts for the current language
  const texts = languagesConfig[language]?.texts || languagesConfig.en.texts;

  // Framer Motion hover animation for the contact button
  const buttonHover = {
    scale: 1.045,
    boxShadow: "0 8px 32px 0 rgba(59,130,246,0.13)",
    transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
  };

  return (
    // Main section with background and padding
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 px-4 pt-28 pb-16 overflow-y-auto">
      <div className="max-w-3xl mx-auto pb-4">
        {/* Page title */}
        <h1
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          style={{ lineHeight: 1.18 }}
        >
          {texts.privacyPolicy}
        </h1>
        {/* Introductory privacy statement */}
        <p className="mb-4 text-lg">
          {texts.privacyIntro ||
            "At PixelHub Host, your privacy is our priority. We are committed to protecting your data while you enjoy our Minecraft server hosting services."}
        </p>
        {/* Company name */}
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-300">
          {config.name}
        </h2>
        {/* List of privacy-related points */}
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>
            {texts.privacyData ||
              "We collect only the data necessary to manage your Minecraft server and account securely."}
          </li>
          <li>
            {texts.privacyCookies ||
              "Cookies are used to keep you logged in and to improve your experience on our hosting platform."}
          </li>
          <li>
            {texts.privacyThirdParty ||
              "We never sell your data. Third-party services are only used for payments and server infrastructure."}
          </li>
          <li>
            {texts.privacyMinecraft ||
              "All Minecraft server data is stored securely and is only accessible by you and our support team for troubleshooting."}
          </li>
        </ul>
        {/* Contact/support info */}
        <p className="mb-4">
          {texts.privacyContact ||
            "If you have any questions about your privacy or data, please contact our support team."}
        </p>
        {/* Discord/contact button with animation */}
        <div className="mt-8 text-center">
          <motion.a
            href={config.contact.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow"
            whileHover={buttonHover}
            whileFocus={buttonHover}
            whileTap={{
              scale: 1.045,
              boxShadow: "0 8px 32px 0 rgba(0,0,0,0.13)",
              transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
            }} // mobile tap animation
            style={{ willChange: "transform, box-shadow" }}
          >
            {texts.aboutUsContact ||
              "Join our Discord for Minecraft Hosting Support"}
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
