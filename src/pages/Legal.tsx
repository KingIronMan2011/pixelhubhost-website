import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { config } from "../config/config";
import languagesConfig from "../config/languages/Languages"; // updated import

const Legal: React.FC = () => {
  const { language } = useLanguage();
  const t = languagesConfig[language].texts;

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {t.legalTitle}
        </h1>
        <p className="mb-4 text-lg">{t.legalIntro}</p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-300">
          {t.legalOperator}
        </h2>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>{t.legalCompany}</li>
          <li>
            {t.legalWebsite.split(":")[0] + ":"}{" "}
            <a
              href="https://www.pixelhubhost.com"
              className="text-blue-400 hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.pixelhubhost.com
            </a>
          </li>
          <li>{t.legalAddress}</li>
          <li>
            {t.legalSupportEmail.split(":")[0] + ":"}{" "}
            <a
              href="mailto:contato@pixelhubhost.com"
              className="text-blue-400 hover:underline break-all"
            >
              contato@pixelhubhost.com
            </a>
          </li>
          <li>
            {t.legalBillingEmail.split(":")[0] + ":"}{" "}
            <a
              href="mailto:no-reply@pixelhubhost.com"
              className="text-blue-400 hover:underline break-all"
            >
              no-reply@pixelhubhost.com
            </a>
          </li>
          <li>
            {t.legalPhone.split(":")[0] + ":"}{" "}
            <a
              href="tel:+5516993981473"
              className="text-blue-400 hover:underline break-all"
            >
              +55 16 99398-1473
            </a>
          </li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-blue-300">
          {t.legalContact}
        </h3>
        <div className="mb-4">
          <a
            href={config.contact.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow"
          >
            {t.aboutUsContact}
          </a>
        </div>
        <div className="mt-8 space-y-3 text-gray-400 text-sm">
          <p>{t.legalDisclaimer}</p>
          <p>{t.legalLiability}</p>
          <p>{t.legalJurisdiction}</p>
          <p>{t.legalCopyright}</p>
        </div>
      </div>
    </section>
  );
};

export default Legal;
