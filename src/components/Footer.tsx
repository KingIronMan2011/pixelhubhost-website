import React from 'react';
import { Youtube } from 'lucide-react';
import i18n from '../i18n';
import languages from '../config/languages/Languages';
import { motion, easeOut } from 'framer-motion';
import DOMPurify from 'dompurify';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Always use the current i18n language for translations
const Footer: React.FC = () => {
  // Use i18n.language as the source of truth, fallback to context, then 'en'
  const currentLanguage = i18n.language || 'en';
  const { t } = useTranslation();
  const contact =
    languages[currentLanguage as keyof typeof languages]?.contact || languages.en.contact;

  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/#home';

  const hoverMotion = {
    whileHover: {
      scale: 1.07,
      boxShadow: '0 8px 32px 0 rgba(0,0,0,0.13)',
      transition: { duration: 0.13, ease: easeOut },
    },
    whileTap: {
      scale: 1.07,
      boxShadow: '0 8px 32px 0 rgba(0,0,0,0.13)',
      transition: { duration: 0.13, ease: easeOut },
    },
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 pt-14 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          {/* Brand & Description */}
          <div>
            <Link
              to={isHome ? '/' : '/'}
              className="font-semibold text-lg mb-4 text-white tracking-wide hover:text-blue-400 transition-colors flex items-center gap-2"
              aria-label="PixelHub Host"
            >
              <img
                src="/web-app-manifest-512x512.png"
                alt="PixelHub Host Logo"
                className="h-8 w-auto"
              />
              {t("texts.brand")}
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">{t("texts.footerDescription")}</p>
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
            <h4 className="font-semibold text-lg mb-4 text-white tracking-wide">{t("texts.company")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/aboutus" className="hover:text-blue-400 transition-colors">
                  {t("texts.aboutUs")}
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="hover:text-blue-400 transition-colors">
                  {t("texts.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white tracking-wide">{t("texts.services")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/#pricing" className="hover:text-blue-400 transition-colors">
                  {t("texts.mcHosting")}
                </Link>
              </li>
              <li>
                <Link to="/#addons" className="hover:text-blue-400 transition-colors">
                  {t("texts.addons")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Language */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white tracking-wide">{t("texts.support")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={contact.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  {t("texts.helpCenter")}
                </a>
              </li>
              <li>
                <a
                  href="https://stats.uptimerobot.com/h2jzO5FroG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  {t("texts.systemStatus")}
                </a>
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
            {t("texts.githubButtonText")}
          </motion.a>
        </div>

        {/* Made by */}
        <div className="flex justify-center mb-1">
          <span className="text-gray-500 text-xs">
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  t("texts.madeByText").replace(
                    'KingIronMan2011',
                    `<a href="https://github.com/KingIronMan2011" target="_blank" rel="noopener noreferrer" class="underline hover:text-blue-400 transition-colors">KingIronMan2011</a>`,
                  ),
                ),
              }}
            />
          </span>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-800 pt-4 mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">{t("texts.footerCopyright")}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">
            <motion.div {...hoverMotion}>
              <Link to="/privacy" className="hover:text-blue-400 transition-colors">
                {t("texts.privacyPolicy")}
              </Link>
            </motion.div>
            <motion.div {...hoverMotion}>
              <Link to="/terms" className="hover:text-blue-400 transition-colors">
                {t("texts.termsOfService")}
              </Link>
            </motion.div>
            <motion.div {...hoverMotion}>
              <Link to="/sitemap" className="hover:text-blue-400 transition-colors">
                {t("texts.sitemap")}
              </Link>
            </motion.div>
            <motion.div {...hoverMotion}>
              <Link to="/legal" className="hover:text-blue-400 transition-colors">
                {t("texts.legal")}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
