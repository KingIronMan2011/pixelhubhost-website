import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import MetaTags from '../components/MetaTags';
import i18n from '../i18n';
import languages from '../config/languages/Languages';
import { config } from '../config/config';

// Always use i18n.language as the source of truth
const language = i18n.language || 'en';
const texts = languages[language]?.texts || languages.en.texts;

const NotFound: React.FC = () => {
  return (
    <>
      <MetaTags title={`${config.name} - Error`} description={texts.notFoundMessage} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
          {texts.notFoundTitle}
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">{texts.notFoundMessage}</p>
        <motion.div whileHover={{ scale: 1.08 }}>
          <Link
            to="/"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {texts.backToHome}
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
