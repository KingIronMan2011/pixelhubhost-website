import { useLanguage } from "../context/LanguageContext";
import { planLinks } from "../config/config";
import languagesConfig from "../config/languages/Languages"; // <-- fixed import (all lowercase)

interface PricingCardProps {
  product: {
    id: string;
    name: Record<string, string>;
    description: Record<string, string>;
  };
  isPopular?: boolean;
  billingInterval?: "monthly" | "quarterly";
}

const PricingCard = ({
  product,
  isPopular,
  billingInterval = "monthly",
}: PricingCardProps) => {
  const { language } = useLanguage();
  const langs = (languagesConfig as any).default || languagesConfig;
  const t = langs[language]?.texts || langs.en.texts;
  const planLink = planLinks[product.id]?.[billingInterval] || "#";

  const billingLabel =
    billingInterval === "monthly"
      ? t.monthly || "Monthly"
      : t.quarterly || "Quarterly";

  return (
    <div
      className={`relative bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        isPopular
          ? "ring-2 ring-blue-500 scale-[1.03]"
          : "hover:ring-1 hover:ring-blue-500/50"
      }`}
    >
      {isPopular && (
        <div className="absolute top-0 inset-x-0 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm text-center font-semibold rounded-t-2xl shadow">
          {t.popularPlan}
        </div>
      )}

      <div className={`p-7 ${isPopular ? "pt-14" : "pt-7"}`}>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
          {product.name[language]}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[3rem] text-base">
          {product.description[language]}
        </p>

        {/* Price and billing label */}
        <div className="flex items-baseline justify-center mb-4">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            $ 14
          </span>
          <span className="text-gray-700 dark:text-gray-400 ml-2">
            /{billingLabel.toLowerCase()}
          </span>
        </div>

        <a
          href={planLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full inline-block text-center py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow
            ${
              isPopular
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            }
          `}
        >
          {t.buyNow || "Buy Now"}
        </a>
        <span className="ml-2 text-sm bg-green-500 text-white px-2 py-0.5 rounded shadow font-semibold">
          -10% OFF
        </span>
      </div>
    </div>
  );
};

export default PricingCard;
