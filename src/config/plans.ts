import Language from "./languages/Languages";

// Helper function to get currency symbol and conversion rate based on language
const getCurrencyByLanguage = (language: Language) => {
  switch (language) {
    case 'en':
      return { symbol: '$', rate: 0.2 };
    case 'de':
    case 'fr':
    case 'it':
      return { symbol: '€', rate: 0.19 };
    default:
      return { symbol: 'R$', rate: 1 };
  }
};

export type PlanFeature = {
  nameKey: string;
  included: boolean;
};

export type Plan = {
  id: string;
  nameKey: string; // e.g. 'texts.plan_oak_name'
  descriptionKey: string; // e.g. 'texts.plan_oak_description'
  price: {
    base_amount: number;
    getCurrencyInfo: (language: Language) => {
      amount: number;
      quarterlyAmount: number;
      currency: string;
    };
  };
  features: PlanFeature[];
  available: boolean;
  popular: boolean;
  color: string;
  specs: {
    threads: number;
    ram: number;
    storage: number;
    backups: number;
    databases: number;
    ports: number;
    splits: number;
  };
};

export const PLANS: Plan[] = [
  {
    id: 'leaf',
    nameKey: 'texts.plan_leaf_name',
    descriptionKey: 'texts.plan_leaf_description',
    price: {
      base_amount: 16,
      getCurrencyInfo: (language) => {
        const { symbol, rate } = getCurrencyByLanguage(language);
        return {
          amount: Math.round(16 * rate),
          quarterlyAmount: Math.round(16 * 3 * rate * 0.9),
          currency: symbol,
        };
      },
    },
    features: [
      { nameKey: 'ddosProtection', included: true },
      { nameKey: 'xeonCpu', included: true },
      { nameKey: 'networkSpeed', included: true },
      { nameKey: 'reliableSupport', included: true },
    ],
    available: true,
    popular: false,
    color: '#854d0e',
    specs: {
      threads: 1,
      ram: 2,
      storage: 5,
      backups: 1,
      databases: 3,
      ports: 3,
      splits: 0,
    },
  },
  {
    id: 'oak',
    nameKey: 'texts.plan_oak_name',
    descriptionKey: 'texts.plan_oak_description',
    price: {
      base_amount: 31,
      getCurrencyInfo: (language) => {
        const { symbol, rate } = getCurrencyByLanguage(language);
        return {
          amount: Math.round(31 * rate),
          quarterlyAmount: Math.round(31 * 3 * rate * 0.9),
          currency: symbol,
        };
      },
    },
    features: [
      { nameKey: 'ddosProtection', included: true },
      { nameKey: 'xeonCpu', included: true },
      { nameKey: 'networkSpeed', included: true },
      { nameKey: 'reliableSupport', included: true },
    ],
    available: true,
    popular: false,
    color: '#854d0e',
    specs: {
      threads: 2,
      ram: 4,
      storage: 10,
      backups: 1,
      databases: 3,
      ports: 3,
      splits: 0,
    },
  },
  {
    id: 'stone',
    nameKey: 'texts.plan_stone_name',
    descriptionKey: 'texts.plan_stone_description',
    price: {
      base_amount: 47,
      getCurrencyInfo: (language) => {
        const { symbol, rate } = getCurrencyByLanguage(language);
        return {
          amount: Math.round(47 * rate),
          quarterlyAmount: Math.round(47 * 3 * rate * 0.9),
          currency: symbol,
        };
      },
    },
    features: [
      { nameKey: 'ddosProtection', included: true },
      { nameKey: 'xeonCpu', included: true },
      { nameKey: 'networkSpeed', included: true },
      { nameKey: 'reliableSupport', included: true },
    ],
    available: true,
    popular: false,
    color: '#78716c',
    specs: {
      threads: 3,
      ram: 6,
      storage: 20,
      backups: 1,
      databases: 3,
      ports: 3,
      splits: 1,
    },
  },
  {
    id: 'iron',
    nameKey: 'texts.plan_iron_name',
    descriptionKey: 'texts.plan_iron_description',
    price: {
      base_amount: 63,
      getCurrencyInfo: (language) => {
        const { symbol, rate } = getCurrencyByLanguage(language);
        return {
          amount: Math.round(63 * rate),
          quarterlyAmount: Math.round(63 * 3 * rate * 0.9),
          currency: symbol,
        };
      },
    },
    features: [
      { nameKey: 'ddosProtection', included: true },
      { nameKey: 'xeonCpu', included: true },
      { nameKey: 'networkSpeed', included: true },
      { nameKey: 'reliableSupport', included: true },
    ],
    available: true,
    popular: true,
    color: '#71717a',
    specs: {
      threads: 4,
      ram: 8,
      storage: 30,
      backups: 1,
      databases: 3,
      ports: 3,
      splits: 2,
    },
  },
  {
    id: 'diamond',
    nameKey: 'texts.plan_diamond_name',
    descriptionKey: 'texts.plan_diamond_description',
    price: {
      base_amount: 94,
      getCurrencyInfo: (language) => {
        const { symbol, rate } = getCurrencyByLanguage(language);
        return {
          amount: Math.round(94 * rate),
          quarterlyAmount: Math.round(94 * 3 * rate * 0.9),
          currency: symbol,
        };
      },
    },
    features: [
      { nameKey: 'ddosProtection', included: true },
      { nameKey: 'xeonCpu', included: true },
      { nameKey: 'networkSpeed', included: true },
      { nameKey: 'reliableSupport', included: true },
    ],
    available: true,
    popular: false,
    color: '#2563eb',
    specs: {
      threads: 6,
      ram: 12,
      storage: 40,
      backups: 1,
      databases: 3,
      ports: 3,
      splits: 3,
    },
  },
  {
    id: 'netherite',
    nameKey: 'texts.plan_netherite_name',
    descriptionKey: 'texts.plan_netherite_description',
    price: {
      base_amount: 122,
      getCurrencyInfo: (language) => {
        const { symbol, rate } = getCurrencyByLanguage(language);
        return {
          amount: Math.round(122 * rate),
          quarterlyAmount: Math.round(122 * 3 * rate * 0.9),
          currency: symbol,
        };
      },
    },
    features: [
      { nameKey: 'ddosProtection', included: true },
      { nameKey: 'xeonCpu', included: true },
      { nameKey: 'networkSpeed', included: true },
      { nameKey: 'reliableSupport', included: true },
    ],
    available: true,
    popular: false,
    color: '#44403c',
    specs: {
      threads: 8,
      ram: 16,
      storage: 60,
      backups: 1,
      databases: 3,
      ports: 3,
      splits: 4,
    },
  },
  {
    id: 'dragon',
    nameKey: 'texts.plan_dragon_name',
    descriptionKey: 'texts.plan_dragon_description',
    price: {
      base_amount: 248,
      getCurrencyInfo: (language) => {
        const { symbol, rate } = getCurrencyByLanguage(language);
        return {
          amount: Math.round(248 * rate),
          quarterlyAmount: Math.round(248 * 3 * rate * 0.9),
          currency: symbol,
        };
      },
    },
    features: [
      { nameKey: 'ddosProtection', included: true },
      { nameKey: 'xeonCpu', included: true },
      { nameKey: 'networkSpeed', included: true },
      { nameKey: 'reliableSupport', included: true },
    ],
    available: true,
    popular: false,
    color: '#581c87',
    specs: {
      threads: 12,
      ram: 32,
      storage: 80,
      backups: 1,
      databases: 3,
      ports: 3,
      splits: 5,
    },
  },
  {
    id: 'custom',
    nameKey: 'texts.plan_custom_name',
    descriptionKey: 'texts.plan_custom_description',
    price: {
      base_amount: 0,
      getCurrencyInfo: (language) => {
        const { symbol } = getCurrencyByLanguage(language);
        return {
          amount: 0,
          quarterlyAmount: 0,
          currency: symbol,
        };
      },
    },
    features: [{ nameKey: 'customFeatures', included: true }],
    available: true,
    popular: false,
    color: '#10b981',
    specs: {
      threads: 0,
      ram: 0,
      storage: 0,
      backups: 0,
      databases: 0,
      ports: 0,
      splits: 0,
    },
  },
];
