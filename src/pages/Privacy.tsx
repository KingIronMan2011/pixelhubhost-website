import React from 'react';
import { config } from '../config/config';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import MetaTags from '../components/MetaTags';

// Privacy page component displays privacy policy and data protection info
const Privacy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <MetaTags title={t('texts.privacyPolicy')} description={t('texts.privacyIntro')} />
      {/* Main section with background and padding */}
      <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 px-4 pt-28 pb-16 overflow-y-auto">
        <div className="max-w-3xl mx-auto pb-4">
          {/* Page title */}
          <h1
            className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            style={{ lineHeight: 1.18 }}
          >
            {t('texts.privacyPolicy')}
          </h1>
          {/* Introductory privacy statement */}
          <p className="mb-4 text-lg">{t('texts.privacyIntro')}</p>
          {/* Company name */}
          <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-300">{config.name}</h2>
          {/* List of privacy-related points */}
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>{t('texts.privacyData')}</li>
            <li>{t('texts.privacyCookies')}</li>
            <li>{t('texts.privacyThirdParty')}</li>
            <li>{t('texts.privacyMinecraft')}</li>
          </ul>
          {/* Contact/support info */}
          <p className="mb-4">{t('texts.privacyContact')}</p>
          {/* Discord/contact button with animation */}
          <div className="mt-8 text-center">
            <motion.a
              href={config.contact.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow"
              whileHover={{
                scale: 1.1,
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                transition: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                },
              }}
              whileFocus={{
                scale: 1.05,
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                transition: {
                  type: 'spring',
                  stiffness: 250,
                  damping: 15,
                },
              }}
              whileTap={{
                scale: 1.045,
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.13)',
                transition: {
                  type: 'tween',
                  duration: 0.13,
                  ease: 'easeInOut',
                },
              }} // mobile tap animation
              style={{ willChange: 'transform, box-shadow' }}
            >
              {t('texts.aboutUsContact')}
            </motion.a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
