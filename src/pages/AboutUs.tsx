import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { config } from "../config/config";
import languagesConfig from "../config/languages/Languages";
import { motion } from "framer-motion";

const AboutUs: React.FC = () => {
  const { language } = useLanguage();
  const texts = languagesConfig[language]?.texts || languagesConfig.en.texts;

  // Framer Motion hover animation for the contact button and values
  const buttonHover = {
    scale: 1.045,
    boxShadow: "0 8px 32px 0 rgba(59,130,246,0.13)",
    transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 py-20 px-4 pt-32 sm:pt-20">
      <div className="max-w-3xl mx-auto">
        <h1
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          style={{ lineHeight: 1.18 }}
        >
          {texts.aboutUsTitle}
        </h1>
        <p className="mb-4 text-lg">
          {/* Minecraft Hosting Service intro */}
          {texts.aboutUsIntro ||
            "Welcome to PixelHub Host – your trusted Minecraft hosting provider! We are passionate gamers and server admins dedicated to delivering the best Minecraft hosting experience for players and communities worldwide."}
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-300">
          {config.name}
        </h2>
        <p className="mb-4">
          {/* Minecraft Hosting Service mission */}
          {texts.aboutUsMission ||
            "Our mission is to empower Minecraft players with reliable, high-performance servers, easy-to-use management tools, and top-tier support. Whether you're running a small friends-only world or a massive public network, PixelHub Host has you covered."}
        </p>
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
            <li key={i} className="rounded px-2 py-1 transition-all">
              {v}
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-blue-300">
          {"Team"}
        </h3>
        <p className="mb-4">
          {/* Minecraft Hosting Service team */}
          {texts.aboutUsTeam ||
            "Our team is made up of experienced Minecraft server admins, developers, and support staff who love the game as much as you do. We're always here to help you build, grow, and protect your Minecraft community."}
        </p>
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
              boxShadow: "0 8px 32px 0 rgba(0,0,0,0.13)",
              transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
            }} // mobile tap animation
            style={{ willChange: "transform, box-shadow" }}
          >
            {texts.aboutUsContact || "Join our Discord for Support"}
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
