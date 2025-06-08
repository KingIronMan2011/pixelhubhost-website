import { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import i18n from '../i18n';
import { PLANS as basePlans } from '../config/plans';
import { config, planLinks } from '../config/config';
import languages from '../config/languages/Languages';
import { motion } from 'framer-motion'; // Animation library

const PricingPlans = () => {
  // Use i18n.language as the source of truth, fallback to context, then 'en'
  const { language: contextLanguage } = useLanguage();
  const language = i18n.language || contextLanguage || 'en';

  // State for selected billing interval (monthly or quarterly)
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'quarterly'>('monthly');

  // Get translations for the current language, fallback to English
  const texts = languages[language as keyof typeof languages]?.texts || languages.en.texts;

  // Use only the plans from config (custom plan is now only in config/plans.ts)
  const plans = useMemo(() => [...basePlans], [basePlans]);

  // Helper to get currency and price display for a plan
  const getCurrencyDisplay = useMemo(() => {
    return (plan: (typeof plans)[0]) => {
      try {
        const currencyInfo = plan.price.getCurrencyInfo(language);
        const { currency = '$', amount = 0, quarterlyAmount = 0 } = currencyInfo || {};

        return {
          currency,
          displayAmount: billingInterval === 'monthly' ? amount : quarterlyAmount,
        };
      } catch {
        return {
          currency: '$',
          displayAmount: 0,
        };
      }
    };
  }, [language, billingInterval]);

  // Framer Motion hover animation for card and button
  const cardHover = {
    scale: 1.025,
    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.13)',
    transition: { type: 'tween', duration: 0.16, ease: 'easeInOut' },
  };
  const buttonHover = {
    scale: 1.04,
    transition: { type: 'tween', duration: 0.13, ease: 'easeInOut' },
  };

  return (
    // Pricing section with gradient background and padding
    <section
      id="pricing"
      className="pt-8 pb-6 bg-gradient-to-b from-white via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500"
    >
      <div className="container mx-auto px-4">
        {/* Section title and subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white drop-shadow-sm">
            {texts.pricingTitle}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-400">{texts.pricingSubtitle}</p>
          {/* Billing interval toggle buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <motion.button
              onClick={() => setBillingInterval('monthly')}
              className={`px-4 py-2 rounded-lg transition-colors font-medium shadow-sm ${
                billingInterval === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              whileHover={buttonHover}
              whileFocus={buttonHover}
              type="button"
              style={{ willChange: 'transform' }}
            >
              {texts.monthly}
            </motion.button>
            <motion.button
              onClick={() => setBillingInterval('quarterly')}
              className={`px-4 py-2 rounded-lg transition-colors font-medium shadow-sm ${
                billingInterval === 'quarterly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              whileHover={buttonHover}
              whileFocus={buttonHover}
              type="button"
              style={{ willChange: 'transform' }}
            >
              {texts.quarterly}
              <span className="ml-2 text-sm bg-green-500 text-white px-2 py-0.5 rounded shadow">
                -10% OFF
              </span>
            </motion.button>
          </div>
        </div>

        {/* Pricing cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => {
            // Get currency and price for this plan
            const { currency, displayAmount } = getCurrencyDisplay(plan);
            // Get the correct plan link
            const planLink = planLinks[plan.id]?.[billingInterval] || '#';

            return (
              // Animated pricing card
              <motion.div
                key={plan.id}
                className={`relative rounded-2xl overflow-hidden bg-white/90 dark:bg-gray-900/90 ${
                  !plan.available ? 'opacity-75 pointer-events-none' : ''
                }`}
                whileHover={{
                  ...cardHover,
                  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.13)',
                }}
                whileFocus={{
                  ...cardHover,
                  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.13)',
                  borderColor: '#3b82f6',
                  borderWidth: '2px',
                  outline: 'none',
                }}
                whileTap={{
                  scale: 1.025,
                  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.13)',
                  borderColor: '#3b82f6',
                  borderWidth: '2px',
                  outline: 'none',
                  transition: {
                    type: 'tween',
                    duration: 0.13,
                    ease: 'easeInOut',
                  },
                }}
                style={{
                  willChange: 'transform, box-shadow, border-color, border-width',
                  border: plan.popular ? '2px solid #3b82f6' : '2px solid transparent',
                }}
              >
                {/* Popular plan badge */}
                {plan.popular && (
                  <div className="absolute top-0 inset-x-0 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm text-center font-semibold rounded-t-2xl shadow">
                    {texts.popularPlan || ''}
                  </div>
                )}

                <div className={`p-7 ${plan.popular ? 'pt-14' : 'pt-7'}`}>
                  {/* Plan name */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center tracking-tight">
                    {plan.name?.[language as keyof typeof plan.name] ?? plan.name['en']}
                  </h3>
                  {/* Plan description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[3rem] text-center text-base">
                    {plan.description[language as keyof typeof plan.description] ??
                      plan.description['en']}
                  </p>

                  {/* Price and billing label */}
                  <div className="mt-8 mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {`${currency} ${displayAmount}`}
                      </span>
                      <span className="text-gray-700 dark:text-gray-400 ml-2">
                        /
                        {billingInterval === 'monthly'
                          ? texts.monthly?.toLowerCase?.()
                          : texts.quarterly?.toLowerCase?.()}
                      </span>
                    </div>
                  </div>

                  {/* Buy Now button */}
                  <motion.a
                    href={planLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-block text-center py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                    } ${
                      !plan.available
                        ? 'opacity-75 cursor-not-allowed bg-gray-500 dark:bg-gray-700 pointer-events-none'
                        : ''
                    }`}
                    tabIndex={!plan.available ? -1 : 0}
                    aria-disabled={!plan.available}
                    whileHover={plan.available ? buttonHover : undefined}
                    whileFocus={plan.available ? buttonHover : undefined}
                    whileTap={plan.available ? { scale: 1.04 } : undefined}
                    style={{ willChange: 'transform' }}
                  >
                    {/* Overlay for sold out plans */}
                    {!plan.available && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 dark:bg-gray-900/70 rounded-lg backdrop-blur-sm">
                        <span className="text-white font-bold text-lg">{texts.soldOut}</span>
                      </div>
                    )}
                    {texts.buyNow || texts.selectPlan}
                  </motion.a>

                  {/* Plan specs list */}
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                      <span>{texts.cpuThreads}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {plan.specs.threads}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                      <span>{texts.ram}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {`${plan.specs.ram}GB`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                      <span>{texts.storage}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {`${plan.specs.storage}GB`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                      <span>{texts.backups}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {plan.specs.backups}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                      <span>{texts.databases}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {plan.specs.databases}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                      <span>{texts.ports}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {plan.specs.ports}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
