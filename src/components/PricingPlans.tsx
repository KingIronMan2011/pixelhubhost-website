import { useMemo, useState, useEffect } from 'react';
import i18n from '../i18n';
import { PLANS as basePlans } from '../config/plans';
import { planLinks, LanguageKey } from '../config/config';
import { motion } from 'framer-motion'; // Animation library

// Define card hover animation properties
const cardHover = {
  scale: 1.02,
  transition: { duration: 0.2 },
};

// Define hover animation properties
const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2 },
};
import { useTranslation } from 'react-i18next';

const PricingPlans = () => {
  const { t } = useTranslation();
  const language = i18n.language || 'en';

  // Force reload of translations when language changes
  useEffect(() => {
    i18n.reloadResources();
  }, [language]);

  // State for selected billing interval (monthly or quarterly)
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'quarterly'>('monthly');

  // Use only the plans from config
  const plans = useMemo(() => [...basePlans], [basePlans]);

  // Helper to get currency and price display for a plan
  const getCurrencyDisplay = useMemo(() => {
    return (plan: (typeof plans)[0]) => {
      try {
        const currencyInfo = plan.price.getCurrencyInfo(language as LanguageKey);
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

  // Add state to track which plan's info is open
  const [openInfo, setOpenInfo] = useState<string | null>(null);

  return (
    <section
      id="pricing"
      className="pt-8 pb-6 bg-gradient-to-b from-white via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500"
    >
      <div className="container mx-auto px-4">
        {/* Section title and subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white drop-shadow-sm">
            {t('texts.pricingTitle')}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-400">{t('texts.pricingSubtitle')}</p>
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
              {t('texts.monthly')}
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
              {t('texts.quarterly')}
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
                    {t('texts.popularPlan')}
                  </div>
                )}

                <div className={`p-7 ${plan.popular ? 'pt-14' : 'pt-7'}`}>
                  {/* Plan name */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center tracking-tight">
                    {t(plan.nameKey)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[3rem] text-center text-base">
                    {t(plan.descriptionKey)}
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
                          ? t('texts.monthly')?.toLowerCase()
                          : t('texts.quarterly')?.toLowerCase()}
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
                    {t('texts.buyNow')}
                  </motion.a>

                  {/* Plan specs list */}
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                      <span>{t('texts.cpuThreads')}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {plan.specs.threads}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                      <span>{t('texts.ram')}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {`${plan.specs.ram}GB`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                      <span>{t('texts.storage')}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {`${plan.specs.storage}GB`}
                      </span>
                    </div>

                    {/* Additional Information Button */}
                    <div className="mt-4 flex justify-center">
                      <motion.button
                        className={`px-4 py-2 rounded-lg font-medium shadow-sm
      ${
        openInfo === plan.id
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
      }
      focus:outline-none`}
                        onClick={() => setOpenInfo(openInfo === plan.id ? null : plan.id)}
                        whileHover={buttonHover}
                        whileFocus={buttonHover}
                        type="button"
                        style={{ willChange: 'transform' }}
                      >
                        {openInfo === plan.id
                          ? t('texts.hideAdditionalInfo') || 'Hide Additional Information'
                          : t('texts.showAdditionalInfo') || 'Show Additional Information'}
                      </motion.button>
                    </div>

                    {/* Additional Information Section */}
                    {openInfo === plan.id && (
                      <>
                        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                          <span>{t('texts.backups')}</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {plan.specs.backups}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                          <span>{t('texts.databases')}</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {plan.specs.databases}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                          <span>{t('texts.ports')}</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {plan.specs.ports}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                          <span>{t('texts.splits')}</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {plan.specs.splits}
                          </span>
                        </div>
                      </>
                    )}
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
