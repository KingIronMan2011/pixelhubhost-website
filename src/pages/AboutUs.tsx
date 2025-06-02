import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { siteConfig } from "../config/site";

const AboutUs: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {siteConfig.texts.aboutUsTitle[language]}
        </h1>
        <p className="mb-4 text-lg">
          {siteConfig.texts.aboutUsIntro[language]}
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-300">
          {siteConfig.name}
        </h2>
        <p className="mb-4">{siteConfig.texts.aboutUsMission[language]}</p>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-purple-300">
          Our Values
        </h3>
        <ul className="list-disc list-inside mb-4">
          {[
            siteConfig.texts.aboutUsValues1[language],
            siteConfig.texts.aboutUsValues2[language],
            siteConfig.texts.aboutUsValues3[language],
            siteConfig.texts.aboutUsValues4[language],
            siteConfig.texts.aboutUsValues5[language],
          ].map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-blue-300">Team</h3>
        <p className="mb-4">{siteConfig.texts.aboutUsTeam[language]}</p>
        <div className="mt-8 text-center">
          <a
            href={siteConfig.contact.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow"
          >
            {siteConfig.texts.aboutUsContact[language]}
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
