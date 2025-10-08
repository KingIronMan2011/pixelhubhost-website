import React from 'react';
import { useTranslation } from 'react-i18next';
import { config } from '../config/config';
import { motion } from 'framer-motion';
import MetaTags from '../components/MetaTags';

// AboutUs page component displays information about PixelHub Host
const AboutUs: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <MetaTags title={t('texts.aboutUsTitle')} description={t('texts.footerDescription')} />
      {/* Main section with background and padding */}
      <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 py-20 px-4 pt-40 sm:pt-32">
        <div className="max-w-3xl mx-auto">
          {/* Page title */}
          <h1
            className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent line-height-tight"
          >
            {t('texts.aboutUsTitle')}
          </h1>
          {/* Introductory paragraph about the hosting service */}
          <p className="mb-4 text-lg">
            {/* Uses translation if available, otherwise fallback English */}
            {t('texts.aboutUsIntro')}
          </p>
          {/* Company name */}
          <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-300">{config.name}</h2>
          {/* Mission statement */}
          <p className="mb-4">{t('texts.aboutUsMission')}</p>
          {/* Values section */}
          <h3 className="text-xl font-semibold mt-8 mb-2 text-purple-300">
            {t('texts.ourValues')}
          </h3>
          <ul className="list-disc list-inside mb-4">
            {/* Render each value from the translations */}
            {[
              t('texts.aboutUsValues1'),
              t('texts.aboutUsValues2'),
              t('texts.aboutUsValues3'),
              t('texts.aboutUsValues4'),
              t('texts.aboutUsValues5'),
            ].map((v, i) => (
              <li key={i} className="rounded px-2 py-1 transition-all">
                {v}
              </li>
            ))}
          </ul>
          {/* Team section */}
          <h3 className="text-xl font-semibold mt-8 mb-2 text-blue-300">{t('texts.team')}</h3>
          <p className="mb-4">
            {/* Team description */}
            {t('texts.aboutUsTeam')}
          </p>
          {/* Contact/Discord button with animation */}
          <div className="mt-8 text-center">
            <motion.a
              href={config.contact.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow will-change-transform-shadow"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
              whileFocus={{
                scale: 1.05,
                transition: { duration: 0.2 },
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
            >
              {t('texts.aboutUsContact')}
            </motion.a>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
