import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { config } from "../config/config";
import languagesConfig from "../config/languages/Languages"; // updated import

const AboutUs: React.FC = () => {
  const { language } = useLanguage();
  const texts = languagesConfig[language]?.texts || languagesConfig.en.texts;

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {texts.aboutUsTitle}
        </h1>
        <p className="mb-4 text-lg">
          {texts.aboutUsIntro}
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-300">
          {config.name}
        </h2>
        <p className="mb-4">{texts.aboutUsMission}</p>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-purple-300">
          {"Our Values"}
        </h3>
        <ul className="list-disc list-inside mb-4">
          {[
            texts.aboutUsValues1,
            texts.aboutUsValues2,
            texts.aboutUsValues3,
            texts.aboutUsValues4,
            texts.aboutUsValues5,
          ].map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-blue-300">
          {"Team"}
        </h3>
        <p className="mb-4">{texts.aboutUsTeam}</p>
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

export default AboutUs;
