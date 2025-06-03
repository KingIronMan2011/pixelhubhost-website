import { useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { plans as basePlans } from "../config/plans";
import { config, planLinks } from "../config/config";
import languagesConfig from "../config/languages/Languages"; // <-- fixed casing to match other imports

// Add a custom plan object
const customPlan = {
  id: "custom",
  name: {
    en: "Custom",
    de: "Individuell",
    fr: "Personnalisé",
    pt: "Personalizado",
  },
  description: {
    en: "Contact us for a custom server tailored to your needs.",
    de: "Kontaktieren Sie uns für einen individuellen Server.",
    fr: "Contactez-nous pour un serveur personnalisé.",
    pt: "Entre em contato para um servidor personalizado.",
  },
  price: {
    getCurrencyInfo: () => ({
      currency: "",
      amount: "",
      quarterlyAmount: "",
    }),
  },
  specs: {
    threads: "-",
    ram: "-",
    storage: "-",
    backups: "-",
    databases: "-",
    ports: "-",
  },
  available: true,
  popular: false,
};

const plans = [...basePlans, customPlan];

const PricingPlans = () => {
  const { language } = useLanguage();
  const [billingInterval, setBillingInterval] = useState<
    "monthly" | "quarterly"
  >("monthly");

  // Use texts from the new languages config
  const texts =
    languagesConfig[language as keyof typeof languagesConfig]?.texts ||
    languagesConfig.en.texts;

  const getCurrencyDisplay = useMemo(() => {
    return (plan: (typeof plans)[0]) => {
      try {
        const currencyInfo = plan.price.getCurrencyInfo(language);
        const {
          currency = "$",
          amount = 0,
          quarterlyAmount = 0,
        } = currencyInfo || {};

        return {
          currency,
          displayAmount:
            billingInterval === "monthly" ? amount : quarterlyAmount,
        };
      } catch {
        return {
          currency: "$",
          displayAmount: 0,
        };
      }
    };
  }, [language, billingInterval]);

  return (
    <section
      id="pricing"
      className="pt-8 pb-6 bg-gradient-to-b from-white via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white drop-shadow-sm">
            {texts.pricingTitle || "Pricing"}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-400">
            {texts.pricingSubtitle || ""}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setBillingInterval("monthly")}
              className={`px-4 py-2 rounded-lg transition-colors font-medium shadow-sm ${
                billingInterval === "monthly"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              {texts.monthly || "Monthly"}
            </button>
            <button
              onClick={() => setBillingInterval("quarterly")}
              className={`px-4 py-2 rounded-lg transition-colors font-medium shadow-sm ${
                billingInterval === "quarterly"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              {texts.quarterly || "Quarterly"}
              <span className="ml-2 text-sm bg-green-500 text-white px-2 py-0.5 rounded shadow">
                -10% OFF
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => {
            const { currency, displayAmount } = getCurrencyDisplay(plan);
            const planLink =
              plan.id === "custom"
                ? config.contact?.discord || "#"
                : planLinks[plan.id]?.[billingInterval] || "#";

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 bg-white/90 dark:bg-gray-900/90 hover:bg-white/90 dark:hover:bg-gray-900/90 hover:shadow-2xl ${
                  plan.popular
                    ? "ring-2 ring-blue-500 scale-[1.03]"
                    : "hover:ring-1 hover:ring-blue-500/50"
                } ${!plan.available ? "opacity-75 pointer-events-none" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 inset-x-0 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm text-center font-semibold rounded-t-2xl shadow">
                    {texts.popularPlan || ""}
                  </div>
                )}

                <div className={`p-7 ${plan.popular ? "pt-14" : "pt-7"}`}>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center font-minecraft tracking-tight">
                    {plan.name?.[language as keyof typeof plan.name] ?? plan.name["en"]}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[3rem] text-center text-base">
                    {plan.description[language as keyof typeof plan.description] ?? plan.description["en"]}
                  </p>

                  <div className="mt-8 mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {plan.id === "custom"
                          ? "-"
                          : `${currency} ${displayAmount}`}
                      </span>
                      {plan.id !== "custom" && (
                        <span className="text-gray-700 dark:text-gray-400 ml-2">
                          /
                          {billingInterval === "monthly"
                            ? texts.monthly?.toLowerCase?.() || "month"
                            : texts.quarterly?.toLowerCase?.() || "quarterly"}
                        </span>
                      )}
                    </div>
                  </div>

                  <a
                    href={planLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-block text-center py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : plan.id === "custom"
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    } ${
                      !plan.available
                        ? "opacity-75 cursor-not-allowed bg-gray-500 dark:bg-gray-700 pointer-events-none"
                        : ""
                    }`}
                    tabIndex={!plan.available ? -1 : 0}
                    aria-disabled={!plan.available}
                  >
                    {!plan.available && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 dark:bg-gray-900/70 rounded-lg backdrop-blur-sm">
                        <span className="text-white font-bold text-lg">
                          {texts.soldOut || "SOLD OUT"}
                        </span>
                      </div>
                    )}
                    {plan.id === "custom"
                      ? texts.contactUs || "Contact us"
                      : texts.buyNow || texts.selectPlan || "Select Plan"}
                  </a>

                  <div
                    className={`mt-6 space-y-4 ${
                      plan.id === "custom" ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                      <span>
                        {texts.cpuThreads || "CPU"}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {plan.id === "custom"
                          ? texts.custom || "-"
                          : plan.specs.threads}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                      <span>{texts.ram || "RAM"}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {plan.id === "custom"
                          ? texts.custom || "-"
                          : `${plan.specs.ram}GB`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                      <span>
                        {texts.storage || "Storage"}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {plan.id === "custom"
                          ? texts.custom || "-"
                          : `${plan.specs.storage}GB`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                      <span>
                        {texts.backups || "Backups"}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {plan.id === "custom"
                          ? texts.custom || "-"
                          : plan.specs.backups}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                      <span>
                        {texts.databases || "Databases"}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {plan.id === "custom"
                          ? texts.custom || "-"
                          : plan.specs.databases}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-400">
                      <span>{texts.ports || "Ports"}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {plan.id === "custom"
                          ? texts.custom || "-"
                          : plan.specs.ports}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
