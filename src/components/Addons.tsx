import React from "react";
import { Globe, Database, HardDrive } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import languagesConfig from "../config/languages/Languages";

const Addons: React.FC = () => {
  const { language } = useLanguage();
  const t = languagesConfig[language as keyof typeof languagesConfig]?.texts || languagesConfig.en.texts;

  const addons = [
    {
      icon: Globe,
      name: t.customDomain,
      description: t.customDomainDesc,
      price: {
        en: "Starting at $4.99",
        pt: "A partir de R$40,00",
        de: "Startet ab €4.99",
        fr: "À partir de €4.99",
      },
    },
    {
      icon: Globe,
      name: t.extraPort,
      description: t.extraPortDesc,
      price: {
        en: "$2.99",
        pt: "R$5,00",
        de: "€2.99",
        fr: "€2.99",
      },
    },
    {
      icon: HardDrive,
      name: t.extraBackup,
      description: t.extraBackupDesc,
      price: {
        en: "$1.99",
        pt: "R$10,00",
        de: "€1.99",
        fr: "€1.99",
      },
    },
    {
      icon: Database,
      name: t.extraDatabase,
      description: t.extraDatabaseDesc,
      price: {
        en: "$3.99",
        pt: "R$10,00",
        de: "€3.99",
        fr: "€3.99",
      },
    },
  ];

  return (
    <section
      id="addons"
      className="py-8 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight drop-shadow-sm">
            {t.addons}
          </h2>
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            {t.addonsSubtitle}
          </p>
        </div>
        <div className="max-w-2xl mx-auto space-y-6">
          {addons.map((addon, index) => (
            <div
              key={index}
              className="group bg-white/90 dark:bg-gray-900/90 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-5"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50 dark:bg-blue-900/20 group-hover:scale-105 transition-transform duration-300">
                <addon.icon className="w-8 h-8 text-blue-500 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {addon.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3 text-base">
                  {addon.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white drop-shadow-sm">
                    {addon.price[language as keyof typeof addon.price]}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium shadow transition-all duration-200"
                  >
                    {t.contactUs}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Addons;
