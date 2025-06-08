import React from 'react';
import { FaDiscord, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import languagesConfig from '../config/languages/Languages';
import { motion } from 'framer-motion';

// Define the type for language keys
type LanguageKey = keyof typeof languagesConfig;

// Main Contact component
const Contact: React.FC = () => {
  // Get current language from context
  const { language } = useLanguage();
  // Fallback to English if language not found
  const langKey = (language in languagesConfig ? language : 'en') as LanguageKey;
  // Get translations and contact info for current language
  const t = languagesConfig[langKey].texts;
  const contact = languagesConfig[langKey].contact;

  // Animation variants for the container (stagger children on show)
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.13,
      },
    },
  };

  // Animation variants for each contact card (entrance, hover)
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 }, // initial state: faded, moved down, slightly smaller
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 16 },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 8px 32px 0 rgba(0,0,0,0.13)',
      transition: { duration: 0.13, ease: 'easeOut' },
    },
  };

  // List of contact methods with their icons, labels, and styles
  const contacts = [
    {
      href: contact.discord,
      icon: <FaDiscord className="w-7 h-7" />,
      label: 'Discord',
      className:
        'bg-blue-600 dark:bg-blue-700 border-blue-700 dark:border-blue-500 text-white hover:text-white',
    },
    {
      href: contact.whatsapp,
      icon: <FaWhatsapp className="w-7 h-7" />,
      label: 'WhatsApp',
      className:
        'bg-green-500 dark:bg-green-600 border-green-700 dark:border-green-500 text-white hover:text-white',
    },
    {
      href: `mailto:${contact.email}`,
      icon: <FaEnvelope className="w-7 h-7" />,
      label: 'Email',
      className:
        'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300',
    },
  ];

  return (
    // Contact section with gradient background and padding
    <section
      id="contact"
      className="py-8 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section title and subtitle */}
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight drop-shadow-sm">
            {t.contactTitle}
          </h2>
          <p className="text-gray-700 dark:text-gray-400 mb-10 text-lg">{t.contactSubtitle}</p>

          {/* Animated contact cards */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 mt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {contacts.map((c) => (
              // Each contact method as an animated card
              <motion.a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                whileHover="hover"
                whileTap={{
                  scale: 1.04,
                  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.13)',
                }}
                className={`flex items-center justify-center gap-3 px-8 py-5 rounded-2xl border shadow transition-all duration-100 font-medium text-lg will-change-transform will-change-shadow hover:-translate-y-1 hover:scale-105 hover:shadow-2xl ${c.className}`}
                style={{ willChange: 'transform, box-shadow' }}
              >
                {c.icon}
                {c.label}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
