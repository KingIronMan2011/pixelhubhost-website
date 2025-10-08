import i18n from '../i18n';
import languages from '../config/languages/Languages'; // Use 'languages' instead of 'languagesConfig'
import { motion } from 'framer-motion';
import { planLinks } from '../config/config';
import { useTranslation } from 'react-i18next';

type LanguageKey = keyof typeof languages;
const { t } = useTranslation();
const language = (i18n.language in languages ? i18n.language : 'en') as LanguageKey;

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
  billingInterval?: 'monthly' | 'quarterly';
}

// PricingCard component: displays a single pricing plan card
const PricingCard = ({ product, isPopular, billingInterval = 'monthly' }: PricingCardProps) => {
  // Get the correct plan link for the selected billing interval
  const planLink = planLinks[product.id]?.[billingInterval] || '#';

  // Get the billing label ("Monthly" or "Quarterly") in the current language
  const billingLabel = billingInterval === 'monthly' ? t('texts.monthly') : t('texts.quarterly');

  // Get currency and price info
  const { currency, amount, quarterlyAmount } = product.price.getCurrencyInfo(language);
  const displayAmount = billingInterval === 'monthly' ? amount : quarterlyAmount;

  return (
    // Animated card container
    <motion.div
      className="relative bg-white/90 dark:bg-gray-900/90 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md p-7"
      initial={{ scale: 1, boxShadow: 'none' }}
      whileHover={{
        scale: 1.025,
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.13)',
        transition: { type: 'tween', duration: 0.13, ease: 'easeInOut' },
      }}
      whileTap={{ scale: 0.95 }} // mobile tap animation
      className={`relative rounded-2xl border shadow-lg transition-all duration-200 ${
        isPopular
          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
      } overflow-hidden will-change-transform-shadow`}
    >
      {/* Popular plan badge */}
      {isPopular && (
        <div className="absolute top-0 inset-x-0 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm text-center font-semibold rounded-t-2xl shadow">
          {t('texts.popularPlan')}
        </div>
      )}

      {/* Card content */}
      <div className={`p-7 ${isPopular ? 'pt-14' : 'pt-7'}`}>
        {/* Plan name */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
          {t('product.name')}
        </h3>
        {/* Plan description */}
        <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[3rem] text-base">
          {t('product.description')}
        </p>

        {/* Price and billing label */}
        <div className="flex items-baseline justify-center mb-4">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            {currency} {displayAmount}
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
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
            }
          `}
          whileHover={{
            scale: 1.04,
            transition: { type: 'tween', duration: 0.13, ease: 'easeInOut' },
          }}
          whileFocus={{
            scale: 1.04,
            transition: { type: 'tween', duration: 0.13, ease: 'easeInOut' },
          }}
          whileTap={{ scale: 0.97 }} // mobile tap animation
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium shadow will-change-transform"
        >
          {t('texts.buyNow')}
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
