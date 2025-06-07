import React from "react";
import { Globe, Youtube } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import languagesConfig from "../config/languages/Languages";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";

const languages = [
  { code: "en", name: "English" },
  { code: "pt", name: "Português" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
];

const hoverMotion = {
  whileHover: {
    scale: 1.07,
    boxShadow: "0 8px 32px 0 rgba(0,0,0,0.13)",
    transition: { duration: 0.13, ease: "easeOut" },
  },
  whileTap: {
    scale: 1.07,
    boxShadow: "0 8px 32px 0 rgba(0,0,0,0.13)",
    transition: { duration: 0.13, ease: "easeOut" },
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Footer: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const langKey = language as keyof typeof languagesConfig;
  const t = languagesConfig[langKey]?.texts || languagesConfig.en.texts;
  const contact =
    languagesConfig[langKey]?.contact || languagesConfig.en.contact;

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 pt-14 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          {/* Brand & Description */}
          <div>
            <a
              href="#home"
              className="font-semibold text-lg mb-4 text-white tracking-wide hover:text-blue-400 transition-colors flex items-center gap-2"
              aria-label="PixelHub Host"
            >
              <img
                src="/pixel_hub_host.png"
                alt="PixelHub Host Logo"
                className="h-7 w-auto mr-2"
                style={{ display: "inline-block", verticalAlign: "middle" }}
              />
              {t.brand}
            </a>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              {t.footerDescription}
            </p>
            {/* Social icons example (e.g., YouTube) */}
            <a
              href="https://www.youtube.com/channel/..."
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube size={16} />
              YouTube
            </a>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white tracking-wide">
              {t.company}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/aboutus"
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.aboutUs}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white tracking-wide">
              {t.services}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#pricing"
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.mcHosting}
                </a>
              </li>
              <li>
                <a
                  href="#addons"
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.addons}
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Language */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white tracking-wide">
              {t.support}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={contact.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.helpCenter}
                </a>
              </li>
              <li>
                <a
                  href="https://stats.uptimerobot.com/h2jzO5FroG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.systemStatus}
                </a>
              </li>
              <li>
                <div className="flex items-center mt-3">
                  <Globe size={16} className="mr-2 text-gray-400" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="bg-gray-900 border border-gray-700 rounded px-2 py-1 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Select language"
                  >
                    {languages.map((lang) => (
                      <option
                        key={lang.code}
                        value={lang.code}
                        className="bg-gray-900 text-gray-300"
                      >
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* GitHub contribution button */}
        <div className="flex justify-center mt-1 mb-1">
          <motion.a
            href="https://github.com/KingIronMan2011/pixelhubhost-website"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-medium py-1 px-2 rounded shadow text-xs transition-colors duration-200"
            {...hoverMotion}
          >
            {t.githubButtonText}
          </motion.a>
        </div>

        {/* Made by */}
        <div className="flex justify-center mb-1">
          <span className="text-gray-500 text-xs">
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  t.madeByText.replace(
                    "KingIronMan2011",
                    `<a href="https://github.com/KingIronMan2011" target="_blank" rel="noopener noreferrer" class="underline hover:text-blue-400 transition-colors">KingIronMan2011</a>`
                  )
                ),
              }}
            />
          </span>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-800 pt-4 mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">{t.footerCopyright}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">
            <motion.a
              href="/privacy"
              className="hover:text-blue-400 transition-colors"
              {...hoverMotion}
            >
              {t.privacyPolicy}
            </motion.a>
            <motion.a
              href="/terms"
              className="hover:text-blue-400 transition-colors"
              {...hoverMotion}
            >
              {t.termsOfService}
            </motion.a>
            <motion.a
              href="/sitemap"
              className="hover:text-blue-400 transition-colors"
              {...hoverMotion}
            >
              {t.sitemap}
            </motion.a>
            <motion.a
              href="/legal"
              className="hover:text-blue-400 transition-colors"
              {...hoverMotion}
            >
              {t.legal}
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
