import React from "react";
import i18n from "../i18n";
import { useLanguage } from "../context/LanguageContext";
import { config } from "../config/config";
import languagesConfig from "../config/languages/Languages";
import { motion } from "framer-motion";
import MetaTags from "../components/MetaTags";

// Legal page component displays legal and contact information for PixelHub Host
const Legal: React.FC = () => {
  const currentLanguage = i18n.language;
  const t = languagesConfig[currentLanguage]?.texts || languagesConfig.en.texts;

  // Framer Motion hover animation for the contact button and links
  const buttonHover = {
    scale: 1.045,
    boxShadow: "0 8px 32px 0 rgba(59,130,246,0.13)",
    transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
  };
  const linkHover = {
    scale: 1.04,
    color: "#60a5fa", // Tailwind blue-400
    transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
  };

  return (
    <>
      <MetaTags title={t.legalTitle} description={t.legalIntro} />
      {/* Main section with background and padding */}
      <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 px-4 pt-28 pb-16 overflow-y-auto">
        <div className="max-w-3xl mx-auto pb-4">
          {/* Page title */}
          <h1
            className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            style={{ lineHeight: 1.18 }}
          >
            {t.legalTitle}
          </h1>
          {/* Introductory legal statement */}
          <p className="mb-4 text-lg">{t.legalIntro}</p>
          {/* Site operator/company info */}
          <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-300">
            {t.legalOperator}
          </h2>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>{t.legalCompany}</li>
            <li>
              {/* Website link with animation */}
              {t.legalWebsite.split(":")[0] + ":"}{" "}
              <motion.a
                href="https://www.pixelhubhost.com"
                className="text-blue-400 hover:underline break-all"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={linkHover}
                whileFocus={linkHover}
                whileTap={{
                  scale: 1.04,
                  color: "#2563eb",
                  transition: {
                    type: "tween",
                    duration: 0.13,
                    ease: "easeInOut",
                  },
                }} // mobile tap animation
                style={{ willChange: "transform, color" }}
              >
                https://www.pixelhubhost.com
              </motion.a>
            </li>
            <li>{t.legalAddress}</li>
            <li>
              {/* Support email link with animation */}
              {t.legalSupportEmail.split(":")[0] + ":"}{" "}
              <motion.a
                href="mailto:contato@pixelhubhost.com"
                className="text-blue-400 hover:underline break-all"
                whileHover={linkHover}
                whileFocus={linkHover}
                whileTap={{
                  scale: 1.04,
                  color: "#2563eb",
                  transition: {
                    type: "tween",
                    duration: 0.13,
                    ease: "easeInOut",
                  },
                }} // mobile tap animation
                style={{ willChange: "transform, color" }}
              >
                contato@pixelhubhost.com
              </motion.a>
            </li>
            <li>
              {/* Billing email link with animation */}
              {t.legalBillingEmail.split(":")[0] + ":"}{" "}
              <motion.a
                href="mailto:no-reply@pixelhubhost.com"
                className="text-blue-400 hover:underline break-all"
                whileHover={linkHover}
                whileFocus={linkHover}
                whileTap={{
                  scale: 1.04,
                  color: "#2563eb",
                  transition: {
                    type: "tween",
                    duration: 0.13,
                    ease: "easeInOut",
                  },
                }} // mobile tap animation
                style={{ willChange: "transform, color" }}
              >
                no-reply@pixelhubhost.com
              </motion.a>
            </li>
            <li>
              {/* Support phone link with animation */}
              {t.legalPhone.split(":")[0] + ":"}{" "}
              <motion.a
                href="tel:+5516993981473"
                className="text-blue-400 hover:underline break-all"
                whileHover={linkHover}
                whileFocus={linkHover}
                whileTap={{
                  scale: 1.04,
                  color: "#2563eb",
                  transition: {
                    type: "tween",
                    duration: 0.13,
                    ease: "easeInOut",
                  },
                }} // mobile tap animation
                style={{ willChange: "transform, color" }}
              >
                +55 16 99398-1473
              </motion.a>
            </li>
          </ul>
          {/* Contact/Discord button with animation */}
          <h3 className="text-xl font-semibold mt-8 mb-2 text-blue-300">
            {t.legalContact}
          </h3>
          <div className="mb-4">
            <motion.a
              href={config.contact.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow"
              whileHover={buttonHover}
              whileFocus={buttonHover}
              whileTap={{
                scale: 1.04,
                boxShadow: "0 4px 16px 0 rgba(59,130,246,0.10)",
                transition: {
                  type: "tween",
                  duration: 0.13,
                  ease: "easeInOut",
                },
              }} // mobile tap animation
              style={{ willChange: "transform, box-shadow" }}
            >
              {t.aboutUsContact}
            </motion.a>
          </div>
          {/* Legal disclaimers and copyright */}
          <div className="mt-8 space-y-3 text-gray-400 text-sm">
            <p>{t.legalDisclaimer}</p>
            <p>{t.legalLiability}</p>
            <p>{t.legalJurisdiction}</p>
            <p>{t.legalCopyright}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Legal;
