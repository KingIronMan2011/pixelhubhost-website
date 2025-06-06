import { useLanguage } from "../context/LanguageContext";
import languagesConfig from "../config/languages/Languages";
import {
  Shield,
  Cpu,
  Network,
  Clock,
  Globe,
  DatabaseBackup,
} from "lucide-react";
import { motion } from "framer-motion";

// Features section component
const Features = () => {
  // Get current language from context
  const { language } = useLanguage();
  // Get translations for the current language, fallback to English
  const t =
    languagesConfig[language as keyof typeof languagesConfig]?.texts ||
    languagesConfig.en.texts;

  // Define the list of features to display, each with an icon, title, and description
  const features = [
    {
      icon: Shield,
      title: t.ddosProtectionDesc ? t.ddosProtection : "",
      description: t.ddosProtectionDesc,
    },
    {
      icon: Cpu,
      title: t.xeonCpuDesc ? t.xeonCpu : "",
      description: t.xeonCpuDesc,
    },
    {
      icon: Network,
      title: t.networkSpeedDesc ? t.networkSpeed : "",
      description: t.networkSpeedDesc,
    },
    {
      icon: Clock,
      title: t.reliableSupportDesc ? t.reliableSupport : "",
      description: t.reliableSupportDesc,
    },
    {
      icon: Globe,
      title: t.freeSubdomainDesc ? t.freeSubdomain : "",
      description: t.freeSubdomainDesc,
    },
    {
      icon: DatabaseBackup,
      title: t.dailyBackupsDesc ? t.dailyBackups : "",
      description: t.dailyBackupsDesc,
    },
  ];

  // Animation variants for the container (stagger children on show)
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.13, // Animate each child with a delay
      },
    },
  };

  // Animation variants for each feature card (entrance, hover, tap)
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 }, // Initial state: faded, moved down, slightly smaller
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 16 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 32px 0 rgba(0,0,0,0.13)",
      transition: { duration: 0.13, ease: "easeOut" },
    },
    tap: {
      scale: 1.05,
      boxShadow: "0 8px 32px 0 rgba(0,0,0,0.13)",
      transition: { duration: 0.13, ease: "easeOut" },
    },
  };

  return (
    // Section for Features, with gradient background and padding
    <section
      id="features"
      className="py-8 bg-gradient-to-b from-gray-100 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500"
    >
      <div className="container mx-auto px-4">
        {/* Section title and subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight drop-shadow-sm">
            {t.featuresTitle}
          </h2>
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            {t.featuresSubtitle}
          </p>
        </div>

        {/* Animated grid of feature cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            // Each feature card with animation and hover/tap effects
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap" // tap animation for mobile
              className="group bg-white/90 dark:bg-gray-900/90 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-md flex flex-col items-center transition-all duration-100"
              style={{ willChange: "transform, box-shadow" }}
            >
              {/* Icon with its own animation */}
              <motion.div
                className="flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50 dark:bg-blue-900/20 mb-4 group-hover:scale-110 transition-transform duration-100"
                initial={{ scale: 0.9, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 12,
                  delay: 0.13 * index,
                }}
              >
                <feature.icon className="w-10 h-10 text-blue-500 dark:text-blue-400" />
              </motion.div>
              {/* Feature title */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              {/* Feature description */}
              <p className="text-gray-600 dark:text-gray-400 text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
