import React from "react";
import { Globe, Database, HardDrive } from "lucide-react";
import i18n from "../i18n";
import { useLanguage } from "../context/LanguageContext";
import languagesConfig from "../config/languages/Languages";
import { motion } from "framer-motion";

// Main Addons component
const Addons: React.FC = () => {
  const currentLanguage = i18n.language;
  const t = languagesConfig[currentLanguage]?.texts || languagesConfig.en.texts;

  // Define the list of addon options, each with icon, name, description, and price
  const addons = [
    {
      icon: Globe,
      name: t.customDomain,
      description: t.customDomainDesc,
      price: t.priceDomain,
    },
    {
      icon: Globe,
      name: t.extraPort,
      description: t.extraPortDesc,
      price: t.pricePort,
    },
    {
      icon: HardDrive,
      name: t.extraBackup,
      description: t.extraBackupDesc,
      price: t.priceBackup,
    },
    {
      icon: Database,
      name: t.extraDatabase,
      description: t.extraDatabaseDesc,
      price: t.priceDatabase,
    },
  ];

  // Animation variants for the container (stagger children on show)
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.13,
      },
    },
  };

  // Animation variants for each card (entrance, hover, tap)
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 }, // initial state (offscreen, faded, slightly smaller)
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 90, damping: 14 },
    },
    hover: {
      scale: 1.04,
      boxShadow: "0 8px 32px 0 rgba(0,0,0,0.13)",
      transition: { duration: 0.13, ease: "easeOut" },
    },
    tap: {
      scale: 1.04,
      boxShadow: "0 8px 32px 0 rgba(0,0,0,0.13)",
      transition: { duration: 0.13, ease: "easeOut" },
    },
  };

  return (
    // Section for Addons, with background gradient and padding
    <section
      id="addons"
      className="py-8 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight drop-shadow-sm">
            {t.addons}
          </h2>
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            {t.addonsSubtitle}
          </p>
        </div>
        {/* Animated list of addon cards */}
        <motion.div
          className="max-w-2xl mx-auto space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {addons.map((addon, index) => (
            // Each addon card with animation and hover/tap effects
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap" // tap animation for mobile
              className="group bg-white/90 dark:bg-gray-900/90 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-800 flex items-center gap-5 transition-all duration-150"
              style={{ willChange: "transform, boxShadow" }}
            >
              {/* Icon with its own animation */}
              <motion.div
                className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50 dark:bg-blue-900/20 group-hover:scale-110 transition-transform duration-150"
                initial={{ scale: 0.9, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 12,
                  delay: 0.13 * index,
                }}
              >
                <addon.icon className="w-8 h-8 text-blue-500 dark:text-blue-400" />
              </motion.div>
              {/* Addon details */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {addon.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3 text-base">
                  {addon.description}
                </p>
                <div className="flex items-center justify-between">
                  {/* Price with entrance animation */}
                  <motion.span
                    className="text-2xl font-bold text-gray-900 dark:text-white drop-shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.13 * index + 0.2, duration: 0.4 }}
                  >
                    {addon.price}
                  </motion.span>
                  {/* Button to scroll to contact section */}
                  <motion.button
                    type="button"
                    onClick={() => {
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium shadow transition-all duration-150"
                    whileTap={{ scale: 0.96 }}
                  >
                    {t.contactUs}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Addons;
