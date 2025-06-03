import { useLanguage } from "../context/LanguageContext";
import { config } from "../config/config";

const brand = config.name;
const contact = config.contact;
const website = config.website;

const texts = {
  underConstruction: {
    en: "Under Construction",
    de: "Im Aufbau",
    fr: "En construction",
    pt: "Em construção",
    it: "In costruzione",
  },
  working: {
    en: "We're working hard to bring you something awesome.",
    de: "Wir arbeiten daran, Ihnen etwas Großartiges zu bieten.",
    fr: "Nous travaillons dur pour vous offrir quelque chose de génial.",
    pt: "Estamos trabalhando para trazer algo incrível para você.",
    it: "Stiamo lavorando duramente per offrirti qualcosa di fantastico.",
  },
  checkBack: {
    en: "Please check back soon!",
    de: "Bitte schauen Sie bald wieder vorbei!",
    fr: "Veuillez revenir bientôt !",
    pt: "Por favor, volte em breve!",
    it: "Torna presto a trovarci!",
  },
  contactUs: {
    en: "Contact us",
    de: "Kontaktieren Sie uns",
    fr: "Contactez-nous",
    pt: "Contate-nos",
    it: "Contattaci",
  },
  language: {
    en: "Language",
    de: "Sprache",
    fr: "Langue",
    pt: "Idioma",
    it: "Lingua",
  },
  visitWebsite: {
    en: "Visit Website",
    de: "Webseite besuchen",
    fr: "Visiter le site",
    pt: "Visitar site",
    it: "Visita il sito",
  },
};

type Language = "en" | "de" | "fr" | "pt" | "it";

const UnderConstruction = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 transition-colors duration-500">
      <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800 flex flex-col items-center max-w-lg w-full">
        {/* Brand/Logo */}
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 mb-2 group"
        >
          {/* Brand Icon */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className="inline-block align-middle group-hover:scale-105 transition-transform"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" fill="#6366f1" />
            <rect x="6" y="6" width="12" height="12" rx="3" fill="#a78bfa" />
          </svg>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow">
            {brand}
          </span>
        </a>
        <span className="text-5xl mb-4 animate-pulse">🚧</span>
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white text-center">
          {texts.underConstruction[language]}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-2">
          {texts.working[language]}
        </p>
        <p className="text-base text-gray-500 dark:text-gray-400 text-center mb-4">
          {texts.checkBack[language]}
        </p>
        {/* Contact */}
        <div className="flex gap-4 mb-4">
          <a
            href={contact.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow"
          >
            {/* Discord Icon */}
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.07.07 0 0 0-.073.035c-.211.375-.444.864-.608 1.249-1.844-.276-3.68-.276-5.486 0-.164-.393-.405-.874-.617-1.249a.07.07 0 0 0-.073-.035 19.736 19.736 0 0 0-4.885 1.515.064.064 0 0 0-.03.027C.533 9.045-.32 13.579.099 18.057a.08.08 0 0 0 .031.056c2.052 1.507 4.042 2.422 5.992 3.029a.077.077 0 0 0 .084-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.104c-.652-.247-1.27-.549-1.872-.892a.077.077 0 0 1-.008-.127c.126-.094.252-.192.371-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.119.099.245.197.371.291a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.873.892.076.076 0 0 0-.04.105c.36.699.772 1.364 1.225 1.993a.076.076 0 0 0 .084.028c1.961-.607 3.951-1.522 6.003-3.029a.077.077 0 0 0 .031-.055c.5-5.177-.838-9.673-3.548-13.661a.061.061 0 0 0-.03-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.947 2.419-2.157 2.419z" />
            </svg>
            Discord
          </a>
          <a
            href={contact.email}
            className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-5 py-2 rounded-lg font-medium border border-blue-200 dark:border-blue-900 hover:border-blue-400 dark:hover:border-blue-700 shadow transition-colors"
          >
            {/* Email Icon */}
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 6.81A2 2 0 0 1 4 5h16a2 2 0 0 1 1.99 1.81l-9.99 6.24-9.99-6.24zM2 8.25V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.25l-9.34 5.83a1 1 0 0 1-1.32 0L2 8.25z" />
            </svg>
            Email
          </a>
        </div>
        {/* Language Switcher */}
        <div className="flex items-center gap-2 mt-4">
          <label
            htmlFor="lang"
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            {texts.language[language]}:
          </label>
          <div className="relative">
            <select
              id="lang"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="appearance-none bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 pr-8 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 shadow-sm"
            >
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="fr">Français</option>
              <option value="pt">Português</option>
              <option value="it">Italiano</option>
            </select>
            {/* Dropdown Arrow Icon */}
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                <path
                  d="M6 8l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center flex items-center justify-center gap-1">
        <svg
          width="14"
          height="14"
          fill="currentColor"
          className="inline-block mb-0.5"
          viewBox="0 0 20 20"
        >
          <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-14.5A6.5 6.5 0 1 0 10 17.5 6.5 6.5 0 0 0 10 3.5zm0 3a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0 1.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
        {new Date().getFullYear()} {brand}. All rights reserved.
      </footer>
    </div>
  );
};

export default UnderConstruction;
