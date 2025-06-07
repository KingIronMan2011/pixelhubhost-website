import { useLanguage } from "../context/LanguageContext";
import { planLinks } from "../config/config";
import languagesConfig from "../config/languages/Languages";
import { motion } from "framer-motion";

// Props for the PricingCard component
interface PricingCardProps {
  product: {
    id: string;
    name: Record<string, string>;
    description: Record<string, string>;
    price: {
      getCurrencyInfo: (lang: string) => {
        currency: string;
        amount: string | number;
        quarterlyAmount?: string | number;
      };
    };
  };
  isPopular?: boolean;
  billingInterval?: "monthly" | "quarterly";
}

// PricingCard component: displays a single pricing plan card
const PricingCard = ({
  product,
  isPopular,
  billingInterval = "monthly",
}: PricingCardProps) => {
  // Get current language from context
  const { language } = useLanguage();
  // Get translations for the current language, fallback to English
  const langs = (languagesConfig as any).default || languagesConfig;
  const t = langs[language]?.texts || langs.en.texts;
  // Get the correct plan link for the selected billing interval
  const planLink = planLinks[product.id]?.[billingInterval] || "#";

  // Get the billing label ("Monthly" or "Quarterly") in the current language
  const billingLabel =
    billingInterval === "monthly"
      ? t.monthly || "Monthly"
      : t.quarterly || "Quarterly";

  // Framer Motion tap animation
  const tapAnimation = {
    scale: 0.97,
    boxShadow: "0 8px 32px 0 rgba(0,0,0,0.13)",
    transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
  };

  return (
    // Animated card container
    <motion.div
      className="relative bg-white/90 dark:bg-gray-900/90 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md p-7"
      initial={{ scale: 1, boxShadow: "none" }}
      whileHover={{
        scale: 1.025,
        boxShadow: "0 8px 32px 0 rgba(0,0,0,0.13)",
        transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
      }}
      whileTap={tapAnimation} // mobile tap animation
      style={{ willChange: "transform, box-shadow" }}
    >
      {/* Popular plan badge */}
      {isPopular && (
        <div className="absolute top-0 inset-x-0 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm text-center font-semibold rounded-t-2xl shadow">
          {t.popularPlan}
        </div>
      )}

      {/* Card content */}
      <div className={`p-7 ${isPopular ? "pt-14" : "pt-7"}`}>
        {/* Plan name */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
          {product.name[language]}
        </h3>
        {/* Plan description */}
        <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[3rem] text-base">
          {product.description[language]}
        </p>

        {/* Price and billing label */}
        <div className="flex items-baseline justify-center mb-4">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            {/* This example hardcodes a demo price, adapt as needed */}$ 14
          </span>
          <span className="text-gray-700 dark:text-gray-400 ml-2">
            /{billingLabel.toLowerCase()}
          </span>
        </div>

        {/* Buy Now button */}
        <motion.a
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
          whileHover={{
            scale: 1.04,
            transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
          }}
          whileFocus={{
            scale: 1.04,
            transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
          }}
          whileTap={{ scale: 0.97 }} // mobile tap animation
          style={{ willChange: "transform" }}
        >
          {t.buyNow || "Buy Now"}
        </motion.a>
        {/* Discount badge (always shown here for demo) */}
        <span className="ml-2 text-sm bg-green-500 text-white px-2 py-0.5 rounded shadow font-semibold">
          -10% OFF
        </span>
      </div>
    </motion.div>
  );
};

export default PricingCard;
