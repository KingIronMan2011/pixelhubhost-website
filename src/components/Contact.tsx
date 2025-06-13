import React from 'react';
import { FaDiscord, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { config } from '../config/config';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  // Use contact info from config
  const contact = {
    discord: config.contact.discord,
    whatsapp: config.contact.whatsapp,
    email: config.contact.email,
  };

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
    hidden: { opacity: 0, y: 30, scale: 0.97 },
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
      label: t('texts.discord'),
      className:
        'bg-blue-600 dark:bg-blue-700 border-blue-700 dark:border-blue-500 text-white hover:text-white',
    },
    {
      href: contact.whatsapp,
      icon: <FaWhatsapp className="w-7 h-7" />,
      label: t('texts.whatsapp'),
      className:
        'bg-green-500 dark:bg-green-600 border-green-700 dark:border-green-500 text-white hover:text-white',
    },
    {
      href: `mailto:${contact.email}`,
      icon: <FaEnvelope className="w-7 h-7" />,
      label: t('texts.email'),
      className:
        'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300',
    },
  ];

  return (
    <section
      id="contact"
      className="py-8 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight drop-shadow-sm">
            {t('texts.contactTitle')}
          </h2>
          <p className="text-gray-700 dark:text-gray-400 mb-10 text-lg">
            {t('texts.contactSubtitle')}
          </p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 mt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {contacts.map((c) => (
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
