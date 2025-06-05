import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import languagesConfig from "../config/languages/Languages";

type SupportedLanguage = keyof typeof languagesConfig;

const Hero = () => {
  const { language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const t =
    languagesConfig[language as SupportedLanguage]?.texts ||
    languagesConfig.en.texts;

  // Animate elements on scroll into view
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = heroRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));
    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Smooth scroll to section by id
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Framer Motion hover animation for buttons
  const buttonHover = {
    scale: 1.045,
    boxShadow: "0 8px 32px 0 rgba(0,0,0,0.13)",
    transition: { type: "tween", duration: 0.16, ease: "easeInOut" },
  };

  return (
    <motion.div
      ref={heroRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative pt-24 pb-4 md:pt-28 md:pb-6 overflow-hidden bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-200 dark:bg-blue-800 opacity-30 animate-float-slow blur-2xl"></div>
        <div className="absolute top-1/3 -left-16 w-48 h-48 rounded-full bg-purple-200 dark:bg-purple-800 opacity-20 animate-float blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-teal-200 dark:bg-teal-800 opacity-20 animate-float-reverse blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="animate-on-scroll text-4xl md:text-6xl font-extrabold mb-7 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg leading-tight md:leading-[1.13] tracking-tight"
            style={{
              letterSpacing: "0.01em",
              lineHeight: 1.18, // Ensures descenders like "g" are visible
            }}
          >
            {t.heroTitle}
          </h1>
          <p className="animate-on-scroll text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto font-medium">
            {t.heroSubtitle}
          </p>
          <div className="animate-on-scroll flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={buttonHover}
              whileFocus={buttonHover}
              onClick={() => scrollToSection("pricing")}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 text-lg"
              style={{ willChange: "transform, box-shadow" }}
            >
              {t.getStarted}
            </motion.button>
            <motion.button
              whileHover={buttonHover}
              whileFocus={buttonHover}
              onClick={() => scrollToSection("features")}
              className="px-8 py-3 bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 font-semibold rounded-xl border border-blue-200 dark:border-blue-900 hover:border-blue-400 dark:hover:border-blue-700 shadow transition-all duration-200 text-lg"
              style={{ willChange: "transform, box-shadow" }}
            >
              {t.learnMore}
            </motion.button>
          </div>
        </div>
      </div>
      <style>
        {`
          .animate-fade-in {
            animation: fadeInHero 1s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes fadeInHero {
            0% { opacity: 0; transform: translateY(32px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-float {
            animation: float 6s ease-in-out infinite alternate;
          }
          .animate-float-reverse {
            animation: floatReverse 7s ease-in-out infinite alternate;
          }
          .animate-float-slow {
            animation: float 12s ease-in-out infinite alternate;
          }
          @keyframes float {
            0% { transform: translateY(0px);}
            100% { transform: translateY(-24px);}
          }
          @keyframes floatReverse {
            0% { transform: translateY(0px);}
            100% { transform: translateY(24px);}
          }
        `}
      </style>
    </motion.div>
  );
};

export default Hero;
