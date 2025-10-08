import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import MetaTags from '../components/MetaTags';

// List of sitemap links with route paths and translation keys for labels
const sitemapLinks = [
  { path: '/', labelKey: 'texts.home' },
  { path: '/aboutus', labelKey: 'texts.aboutUsTitle' },
  { path: '/privacy', labelKey: 'texts.privacyPolicy' },
  { path: '/terms', labelKey: 'texts.termsOfService' },
  { path: '/legal', labelKey: 'texts.legal' },
];

// Sitemap page component displays a list of important site links
const Sitemap: React.FC = () => {
  // Always use i18n.language for detection
  const { t } = useTranslation();

  return (
    <>
      <MetaTags title={t('texts.sitemap')} description={t('texts.sitemapMinecraftNote')} />
      <div className="max-w-lg mx-auto mt-24 mb-12 p-8 rounded-2xl shadow-xl bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800">
        {/* Page title, translated */}
        <h1
          className="font-extrabold text-3xl mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow line-height-tight"
        >
          {t('texts.sitemap')}
        </h1>
        {/* List of sitemap links, each with animation and translation */}
        <ul className="space-y-3">
          {sitemapLinks.map((link) => (
            <li key={link.path}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="will-change-transform-shadow"
              >
                <Link
                  to={link.path}
                  className="block px-5 py-3 rounded-xl font-medium text-base text-blue-700 dark:text-blue-300 bg-blue-50/60 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-200 shadow-sm"
                >
                  {t(link.labelKey)}
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
        {/* Additional note about Minecraft hosting, translated */}
        <div className="mt-10 text-center text-gray-500 dark:text-gray-400 text-sm">
          {t('texts.sitemapMinecraftNote')}
        </div>
      </div>
    </>
  );
};

export default Sitemap;
