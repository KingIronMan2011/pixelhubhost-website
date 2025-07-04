import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import i18n from '../i18n';
import { useLanguage } from '../context/LanguageContext';
import languages from '../config/languages/Languages';

const Hero: React.FC = () => {
  // Use i18n.language as the source of truth, fallback to context, then 'en'
  const { language } = useLanguage();
  const currentLanguage = (i18n.language || language || 'en') as keyof typeof languages;
  const t = languages[currentLanguage]?.texts || languages.en.texts;

  const heroRef = useRef<HTMLDivElement>(null);

  // Animate elements with .animate-on-scroll class when they enter the viewport
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 },
    );
    // Select all elements with .animate-on-scroll inside the hero section
    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    // Cleanup observer on unmount
    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Framer Motion hover animation for the call-to-action buttons
  const buttonHover = {
    scale: 1.05,
    boxShadow: '0 8px 32px 0 rgba(59,130,246,0.15)',
    transition: { duration: 0.13, ease: 'easeOut' },
  };

  // Helper function to scroll to a given section by ID
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to top when #home is triggered
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    // Main hero section with animated entrance and gradient background
    <motion.div
      ref={heroRef}
      id="home"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative pt-24 pb-4 md:pt-28 md:pb-6 overflow-hidden bg-gradient-to-b from-white via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500"
    >
      {/* Background blobs or decorative elements */}
      <div className="pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-blue-200 dark:bg-blue-800 opacity-20 animate-float blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-teal-200 dark:bg-teal-800 opacity-20 animate-float-reverse blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main hero title with gradient text and animation */}
          <h1
            className="animate-on-scroll text-4xl md:text-6xl font-extrabold mb-7 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg leading-tight md:leading-[1.13] tracking-tight"
            style={{
              letterSpacing: '0.01em',
              lineHeight: 1.18, // Ensures descenders like "g" are visible
            }}
          >
            {t.heroTitle}
          </h1>
          {/* Subtitle below the main title */}
          <p className="animate-on-scroll text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto font-medium">
            {t.heroSubtitle}
          </p>
          {/* Call-to-action buttons */}
          <div className="animate-on-scroll flex flex-col sm:flex-row justify-center gap-4">
            {/* "Get Started" button */}
            <motion.button
              whileHover={buttonHover}
              whileFocus={buttonHover}
              onClick={() => scrollToSection('pricing')}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 text-lg"
              style={{ willChange: 'transform, box-shadow' }}
            >
              {t.getStarted}
            </motion.button>
            {/* "Learn More" button */}
            <motion.button
              whileHover={buttonHover}
              whileFocus={buttonHover}
              onClick={() => scrollToSection('features')}
              className="px-8 py-3 bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 font-semibold rounded-xl border border-blue-200 dark:border-blue-900 hover:border-blue-400 dark:hover:border-blue-700 shadow transition-all duration-200 text-lg"
              style={{ willChange: 'transform, box-shadow' }}
            >
              {t.learnMore}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Custom CSS for fade-in and floating blob animations */}
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
          @keyframes float {
            0% { transform: translateY(0px);}
            100% { transform: translateY(-20px);}
          }
          @keyframes floatReverse {
            0% { transform: translateY(0px);}
            100% { transform: translateY(20px);}
          }
        `}
      </style>
    </motion.div>
  );
};

export default Hero;
