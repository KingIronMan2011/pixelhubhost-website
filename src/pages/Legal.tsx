import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { config } from "../config/config";
import languagesConfig from "../config/languages/Languages";
import { motion } from "framer-motion";

const Legal: React.FC = () => {
  const { language } = useLanguage();
  const t = languagesConfig[language].texts;

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
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 px-4 pt-28 pb-16 overflow-y-auto">
      <div className="max-w-3xl mx-auto pb-4">
        <h1
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          style={{ lineHeight: 1.18 }}
        >
          {t.legalTitle}
        </h1>
        <p className="mb-4 text-lg">
          {t.legalIntro ||
            "PixelHub Host is committed to providing secure, reliable, and high-performance Minecraft server hosting. Please review our legal information and policies below."}
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-300">
          {t.legalOperator}
        </h2>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>{t.legalCompany}</li>
          <li>
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
                transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
              }} // mobile tap animation
              style={{ willChange: "transform, color" }}
            >
              https://www.pixelhubhost.com
            </motion.a>
          </li>
          <li>{t.legalAddress}</li>
          <li>
            {t.legalSupportEmail.split(":")[0] + ":"}{" "}
            <motion.a
              href="mailto:contato@pixelhubhost.com"
              className="text-blue-400 hover:underline break-all"
              whileHover={linkHover}
              whileFocus={linkHover}
              whileTap={{
                scale: 1.04,
                color: "#2563eb",
                transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
              }} // mobile tap animation
              style={{ willChange: "transform, color" }}
            >
              contato@pixelhubhost.com
            </motion.a>
          </li>
          <li>
            {t.legalBillingEmail.split(":")[0] + ":"}{" "}
            <motion.a
              href="mailto:no-reply@pixelhubhost.com"
              className="text-blue-400 hover:underline break-all"
              whileHover={linkHover}
              whileFocus={linkHover}
              whileTap={{
                scale: 1.04,
                color: "#2563eb",
                transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
              }} // mobile tap animation
              style={{ willChange: "transform, color" }}
            >
              no-reply@pixelhubhost.com
            </motion.a>
          </li>
          <li>
            {t.legalPhone.split(":")[0] + ":"}{" "}
            <motion.a
              href="tel:+5516993981473"
              className="text-blue-400 hover:underline break-all"
              whileHover={linkHover}
              whileFocus={linkHover}
              whileTap={{
                scale: 1.04,
                color: "#2563eb",
                transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
              }} // mobile tap animation
              style={{ willChange: "transform, color" }}
            >
              +55 16 99398-1473
            </motion.a>
          </li>
        </ul>
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
              transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
            }} // mobile tap animation
            style={{ willChange: "transform, box-shadow" }}
          >
            {t.aboutUsContact ||
              "Join our Discord for Minecraft Hosting Support"}
          </motion.a>
        </div>
        <div className="mt-8 space-y-3 text-gray-400 text-sm">
          <p>
            {t.legalDisclaimer ||
              "PixelHub Host provides Minecraft server hosting only. We are not affiliated with Mojang AB or Microsoft. All Minecraft trademarks are property of their respective owners."}
          </p>
          <p>
            {t.legalLiability ||
              "We strive to keep your Minecraft servers online and secure, but cannot be held liable for data loss, downtime, or third-party actions."}
          </p>
          <p>
            {t.legalJurisdiction ||
              "All legal matters are subject to the jurisdiction specified in our Terms of Service."}
          </p>
          <p>
            {t.legalCopyright ||
              "© PixelHub Host. All rights reserved. Minecraft is a trademark of Mojang AB."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Legal;
