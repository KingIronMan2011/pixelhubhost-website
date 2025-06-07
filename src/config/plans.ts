import { Language } from "./config";

// Helper function to get currency symbol and conversion rate based on language
// - English: USD ($), rate 0.2 (likely for BRL to USD conversion)
// - German, French, Italian: Euro (€), rate 0.19
// - Default (Portuguese/Brazil): Real (R$), rate 1 (no conversion)
const getCurrencyByLanguage = (language: Language) => {
  switch (language) {
    case "en":
      return { symbol: "$", rate: 0.2 };
    case "de":
    case "fr":
    case "it":
      return { symbol: "€", rate: 0.19 };
    default:
      return { symbol: "R$", rate: 1 };
  }
};

// Type for a feature included in a plan
export type PlanFeature = {
  nameKey: string; // translation key
  included: boolean;
};

// Type for a hosting plan
export type Plan = {
  id: string;
  name: { [key in Language]: string };
  description: { [key in Language]: string };
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
  };
};

// Example of how you might define an array of plans
export const PLANS: Plan[] = [
  {
    id: "plan1",
    name: {
      en: "Basic Plan",
      de: "Basisplan",
      fr: "Forfait Basique",
      it: "Piano Base",
      pt: "Plano Básico",
    },
    description: {
      en: "A solid start for small communities.",
      de: "Ein solider Start für kleine Communities.",
      fr: "Un bon départ pour les petites communautés.",
      it: "Una base solida per piccole comunità.",
      pt: "Um bom início para comunidades pequenas.",
    },
    price: {
      base_amount: 20, // 20 BRL
      getCurrencyInfo: (language: Language) => {
        const { symbol, rate } = getCurrencyByLanguage(language);
        const monthly = 20 * rate;
        return {
          amount: parseFloat(monthly.toFixed(2)),
          quarterlyAmount: parseFloat((monthly * 3 * 0.9).toFixed(2)),
          currency: symbol,
        };
      },
    },
    features: [
      { nameKey: "ddosProtection", included: true },
      { nameKey: "reliableSupport", included: true },
      { nameKey: "dailyBackups", included: false },
    ],
    available: true,
    popular: false,
    color: "#3b82f6",
    specs: {
      threads: 2,
      ram: 2,
      storage: 10,
      backups: 1,
      databases: 1,
      ports: 2,
    },
  },
  {
    id: "oak",
    name: {
      en: "Oak",
      pt: "Carvalho",
      de: "Eiche",
      fr: "Chêne",
      it: "Quercia",
    },
    description: {
      en: "Great for growing Minecraft servers",
      pt: "Ótimo para servidores Minecraft em crescimento",
      de: "Ideal für wachsende Minecraft-Server",
      fr: "Idéal pour les serveurs Minecraft en croissance",
      it: "Ottimo per server Minecraft in crescita",
    },
    price: {
      base_amount: 34,
      getCurrencyInfo: (language) => {
        const { symbol, rate } = getCurrencyByLanguage(language);
        return {
          amount: Math.round(34 * rate),
          quarterlyAmount: Math.round(34 * 3 * rate * 0.9), // 10% discount for quarterly
          currency: symbol,
        };
      },
    },
    features: [
      { nameKey: "ddosProtection", included: true },
      { nameKey: "xeonCpu", included: true },
      { nameKey: "networkSpeed", included: true },
      { nameKey: "reliableSupport", included: true },
    ],
    available: true,
    popular: false,
    color: "#854d0e",
    specs: {
      threads: 2,
      ram: 4,
      storage: 10,
      backups: 1,
      databases: 3,
      ports: 3,
    },
  },
  {
    id: "stone",
    name: {
      en: "Stone",
      pt: "Pedra",
      de: "Stein",
      fr: "Pierre",
      it: "Pietra",
    },
    description: {
      en: "Solid performance for medium-sized servers",
      pt: "Desempenho sólido para servidores médios",
      de: "Solide Leistung für mittelgroße Server",
      fr: "Performance solide pour serveurs moyens",
      it: "Prestazioni solide per server di medie dimensioni",
    },
    price: {
      base_amount: 51,
      getCurrencyInfo: (language) => {
        const { symbol, rate } = getCurrencyByLanguage(language);
        return {
          amount: Math.round(51 * rate),
          quarterlyAmount: Math.round(51 * 3 * rate * 0.9), // 10% discount for quarterly
          currency: symbol,
        };
      },
    },
    features: [
      { nameKey: "ddosProtection", included: true },
      { nameKey: "xeonCpu", included: true },
      { nameKey: "networkSpeed", included: true },
      { nameKey: "reliableSupport", included: true },
    ],
    available: true,
    popular: false,
    color: "#78716c",
    specs: {
      threads: 3,
      ram: 6,
      storage: 20,
      backups: 1,
      databases: 3,
      ports: 3,
    },
  },
  {
    id: "iron",
    name: {
      en: "Iron",
      pt: "Ferro",
      de: "Eisen",
      fr: "Fer",
      it: "Ferro",
    },
    description: {
      en: "Powerful hosting for established communities",
      pt: "Hospedagem poderosa para comunidades estabelecidas",
      de: "Leistungsstarkes Hosting für etablierte Communities",
      fr: "Hébergement puissant pour communautés établies",
      it: "Hosting potente per community consolidate",
    },
    price: {
      base_amount: 68,
      getCurrencyInfo: (language) => {
        const { symbol, rate } = getCurrencyByLanguage(language);
        return {
          amount: Math.round(68 * rate),
          quarterlyAmount: Math.round(68 * 3 * rate * 0.9), // 10% discount for quarterly
          currency: symbol,
        };
      },
    },
    features: [
      { nameKey: "ddosProtection", included: true },
      { nameKey: "xeonCpu", included: true },
      { nameKey: "networkSpeed", included: true },
      { nameKey: "reliableSupport", included: true },
    ],
    available: true,
    popular: true,
    color: "#71717a",
    specs: {
      threads: 4,
      ram: 8,
      storage: 30,
      backups: 1,
      databases: 3,
      ports: 3,
    },
  },
  {
    id: "diamond",
    name: {
      en: "Diamond",
      pt: "Diamante",
      de: "Diamant",
      fr: "Diamant",
      it: "Diamante",
    },
    description: {
      en: "Premium hosting for large communities",
      pt: "Hospedagem premium para grandes comunidades",
      de: "Premium-Hosting für große Communities",
      fr: "Hébergement premium pour grandes communautés",
      it: "Hosting premium per grandi community",
    },
    price: {
      base_amount: 100,
      getCurrencyInfo: (language) => {
        const { symbol, rate } = getCurrencyByLanguage(language);
        return {
          amount: Math.round(100 * rate),
          quarterlyAmount: Math.round(100 * 3 * rate * 0.9), // 10% discount for quarterly
          currency: symbol,
        };
      },
    },
    features: [
      { nameKey: "ddosProtection", included: true },
      { nameKey: "xeonCpu", included: true },
      { nameKey: "networkSpeed", included: true },
      { nameKey: "reliableSupport", included: true },
    ],
    available: true,
    popular: false,
    color: "#2563eb",
    specs: {
      threads: 6,
      ram: 12,
      storage: 40,
      backups: 1,
      databases: 3,
      ports: 3,
    },
  },
  {
    id: "netherite",
    name: {
      en: "Netherite",
      pt: "Netherita",
      de: "Netherit",
      fr: "Netherite",
      it: "Netherite",
    },
    description: {
      en: "Ultimate performance for demanding servers",
      pt: "Performance máxima para servidores exigentes",
      de: "Ultimative Leistung für anspruchsvolle Server",
      fr: "Performance ultime pour serveurs exigeants",
      it: "Prestazioni estreme per server esigenti",
    },
    price: {
      base_amount: 130,
      getCurrencyInfo: (language) => {
        const { symbol, rate } = getCurrencyByLanguage(language);
        return {
          amount: Math.round(130 * rate),
          quarterlyAmount: Math.round(130 * 3 * rate * 0.9), // 10% discount for quarterly
          currency: symbol,
        };
      },
    },
    features: [
      { nameKey: "ddosProtection", included: true },
      { nameKey: "xeonCpu", included: true },
      { nameKey: "networkSpeed", included: true },
      { nameKey: "reliableSupport", included: true },
    ],
    available: true,
    popular: false,
    color: "#44403c",
    specs: {
      threads: 8,
      ram: 16,
      storage: 60,
      backups: 1,
      databases: 3,
      ports: 3,
    },
  },
  {
    id: "dragon",
    name: {
      en: "Ender Dragon",
      pt: "Dragão do Fim",
      de: "Enderdrache",
      fr: "Dragon de l'Ender",
      it: "Drago Ender",
    },
    description: {
      en: "Maximum power for large networks",
      pt: "Poder máximo para grandes redes",
      de: "Maximale Leistung für große Netzwerke",
      fr: "Puissance maximale pour grands réseaux",
      it: "Potenza massima per grandi reti",
    },
    price: {
      base_amount: 248,
      getCurrencyInfo: (language) => {
        const { symbol, rate } = getCurrencyByLanguage(language);
        return {
          amount: Math.round(248 * rate),
          quarterlyAmount: Math.round(248 * 3 * rate * 0.9), // 10% discount for quarterly
          currency: symbol,
        };
      },
    },
    features: [
      { nameKey: "ddosProtection", included: true },
      { nameKey: "xeonCpu", included: true },
      { nameKey: "networkSpeed", included: true },
      { nameKey: "reliableSupport", included: true },
    ],
    available: true,
    popular: false,
    color: "#581c87",
    specs: {
      threads: 12,
      ram: 32,
      storage: 80,
      backups: 1,
      databases: 3,
      ports: 3,
    },
  },
];
