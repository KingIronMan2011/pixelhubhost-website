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

const Features = () => {
  const { language } = useLanguage();
  const t = languagesConfig[language as keyof typeof languagesConfig]?.texts || languagesConfig.en.texts;

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

  return (
    <section
      id="features"
      className="py-8 bg-gradient-to-b from-gray-100 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight drop-shadow-sm">
            {t.featuresTitle}
          </h2>
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            {t.featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/90 dark:bg-gray-900/90 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50 dark:bg-blue-900/20 mb-4 group-hover:scale-105 transition-transform duration-300">
                <feature.icon className="w-10 h-10 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
