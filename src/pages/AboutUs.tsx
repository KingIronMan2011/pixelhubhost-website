import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { config } from '../config/config';
import languagesConfig from '../config/languages/Languages';
import i18n from '../i18n';
import { motion } from 'framer-motion';
import MetaTags from '../components/MetaTags';

// AboutUs page component displays information about PixelHub Host
const AboutUs: React.FC = () => {
  // Always use i18n.language for detection
  const language = i18n.language;
  // Get the correct set of translated texts for the current language
  const texts = languagesConfig[language]?.texts || languagesConfig.en.texts;

  // Framer Motion animation for the contact button and values
  const buttonHover = {
    scale: 1.045,
    boxShadow: '0 8px 32px 0 rgba(59,130,246,0.13)',
    transition: { type: 'tween', duration: 0.13, ease: 'easeInOut' },
  };

  return (
    <>
      <MetaTags title={texts.aboutUsTitle} description={texts.footerDescription} />
      {/* Main section with background and padding */}
      <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 py-20 px-4 pt-40 sm:pt-32">
        <div className="max-w-3xl mx-auto">
          {/* Page title */}
          <h1
            className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            style={{ lineHeight: 1.18 }}
          >
            {texts.aboutUsTitle}
          </h1>
          {/* Introductory paragraph about the hosting service */}
          <p className="mb-4 text-lg">
            {/* Uses translation if available, otherwise fallback English */}
            {texts.aboutUsIntro}
          </p>
          {/* Company name */}
          <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-300">{config.name}</h2>
          {/* Mission statement */}
          <p className="mb-4">{texts.aboutUsMission}</p>
          {/* Values section */}
          <h3 className="text-xl font-semibold mt-8 mb-2 text-purple-300">
            {texts.ourValues || 'Our Values'}
          </h3>
          <ul className="list-disc list-inside mb-4">
            {/* Render each value from the translations */}
            {[
              texts.aboutUsValues1,
              texts.aboutUsValues2,
              texts.aboutUsValues3,
              texts.aboutUsValues4,
              texts.aboutUsValues5,
            ].map((v, i) => (
              <li key={i} className="rounded px-2 py-1 transition-all">
                {v}
              </li>
            ))}
          </ul>
          {/* Team section */}
          <h3 className="text-xl font-semibold mt-8 mb-2 text-blue-300">{texts.team || 'Team'}</h3>
          <p className="mb-4">
            {/* Team description */}
            {texts.aboutUsTeam}
          </p>
          {/* Contact/Discord button with animation */}
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
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.13)',
                transition: {
                  type: 'tween',
                  duration: 0.13,
                  ease: 'easeInOut',
                },
              }} // mobile tap animation
              style={{ willChange: 'transform, box-shadow' }}
            >
              {texts.aboutUsContact}
            </motion.a>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
