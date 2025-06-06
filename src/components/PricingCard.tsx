import { useLanguage } from "../context/LanguageContext";
import { planLinks } from "../config/config";
import languagesConfig from "../config/languages/Languages";
import { motion } from "framer-motion";

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

  // Framer Motion hover animation for card and button
  const cardHover = {
    scale: 1.025,
    boxShadow: "0 8px 32px 0 rgba(0,0,0,0.13)",
    transition: { type: "tween", duration: 0.16, ease: "easeInOut" },
  };
  const buttonHover = {
    scale: 1.04,
    transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
  };

  return (
    <motion.div
      className={`relative bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
        isPopular ? "ring-2 ring-blue-500 scale-[1.03]" : ""
      }`}
      whileHover={cardHover}
      whileTap={{
        scale: 1.04,
        boxShadow: "0 8px 32px 0 rgba(0,0,0,0.13)",
        transition: { type: "tween", duration: 0.13, ease: "easeInOut" },
      }} // mobile tap animation
      style={{ willChange: "transform, box-shadow" }}
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
          whileHover={buttonHover}
          whileFocus={buttonHover}
          whileTap={{ scale: 0.97 }} // mobile tap animation
          style={{ willChange: "transform" }}
        >
          {t.buyNow || "Buy Now"}
        </motion.a>
        <span className="ml-2 text-sm bg-green-500 text-white px-2 py-0.5 rounded shadow font-semibold">
          -10% OFF
        </span>
      </div>
    </motion.div>
  );
};

export default PricingCard;
