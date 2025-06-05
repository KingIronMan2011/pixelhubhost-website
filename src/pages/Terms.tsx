import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { config } from "../config/config";
import languagesConfig from "../config/languages/Languages";

const Terms: React.FC = () => {
  const { language } = useLanguage();
  const texts = languagesConfig[language]?.texts || languagesConfig.en.texts;

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 px-4 pt-28 pb-24 overflow-y-auto">
      <div className="max-w-3xl mx-auto pb-8">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {texts.termsOfService}
        </h1>
        <p className="mb-4 text-lg">{texts.tosIntro}</p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-300">
          {config.name}
        </h2>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>{texts.tosUsage}</li>
          <li>{texts.tosAccount}</li>
          <li>{texts.tosChanges}</li>
        </ul>
        <p className="mb-4">{texts.tosContact}</p>
        <div className="mt-8 text-center">
          <a
            href={config.contact.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow"
          >
            {texts.aboutUsContact}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Terms;
