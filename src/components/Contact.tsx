import React from "react";
import { FaDiscord } from "react-icons/fa";
import { Phone } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import languagesConfig from "../config/languages/Languages";

type LanguageKey = keyof typeof languagesConfig;

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const langKey = (language in languagesConfig ? language : "en") as LanguageKey;
  const t = languagesConfig[langKey].texts;
  const contact = languagesConfig[langKey].contact;

  return (
    <section
      id="contact"
      className="py-8 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight drop-shadow-sm">
            {t.contactTitle}
          </h2>
          <p className="text-gray-700 dark:text-gray-400 mb-10 text-lg">
            {t.contactSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 mt-8">
            <a
              href={contact.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium text-lg"
            >
              <FaDiscord className="w-7 h-7" />
              Discord
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 font-medium text-lg"
            >
              <Phone className="w-7 h-7" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
