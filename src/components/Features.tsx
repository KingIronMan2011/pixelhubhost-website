import { Shield, Cpu, Network, Clock, Globe, DatabaseBackup } from 'lucide-react';
import { motion } from 'framer-motion';
import { config } from '../config/config';
import { useTranslation } from 'react-i18next';

// Features section component
const Features = () => {
  const { t } = useTranslation();

  // Define the list of features to display, each with an icon, title, and description
  const features = [
    {
      icon: Shield,
      title: t('texts.ddosProtectionDesc') ? t('texts.ddosProtection') : '',
      description: t('texts.ddosProtectionDesc'),
    },
    {
      icon: Cpu,
      title: t('texts.xeonCpuDesc') ? t('texts.xeonCpu') : '',
      description: t('texts.xeonCpuDesc'),
    },
    {
      icon: Network,
      title: t('texts.networkSpeedDesc') ? t('texts.networkSpeed') : '',
      description: t('texts.networkSpeedDesc'),
    },
    {
      icon: Clock,
      title: t('texts.reliableSupportDesc') ? t('texts.reliableSupport') : '',
      description: t('texts.reliableSupportDesc'),
    },
    {
      icon: Globe,
      title: t('texts.freeSubdomainDesc') ? t('texts.freeSubdomain') : '',
      description: t('texts.freeSubdomainDesc'),
    },
    {
      icon: DatabaseBackup,
      title: t('texts.dailyBackupsDesc') ? t('texts.dailyBackups') : '',
      description: t('texts.dailyBackupsDesc'),
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

  // Animation variants for individual cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' },
    tap: { scale: 0.95 },
  };

  // Trigger a test error if enabled in config
  if (config.testErrorHandling) {
    // @ts-expect-error
    const test = doesNotExist.property;
  }

  return (
    <section
      id="features"
      className="py-8 bg-gradient-to-b from-gray-100 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500"
    >
      <div className="container mx-auto px-4">
        {/* Section title and subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight drop-shadow-sm">
            {t('texts.featuresTitle')}
          </h2>
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            {t('texts.featuresSubtitle')}
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
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              className="group bg-white/90 dark:bg-gray-900/90 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-md flex flex-col items-center transition-all duration-100"
              style={{ willChange: 'transform, box-shadow' }}
            >
              {/* Icon with its own animation */}
              <motion.div
                className="flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50 dark:bg-blue-900/20 mb-4 group-hover:scale-110 transition-transform duration-100"
                initial={{ scale: 0.9, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
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
              <p className="text-gray-600 dark:text-gray-400 text-base">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
