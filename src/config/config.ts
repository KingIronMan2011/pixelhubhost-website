export const config = {
  name: "PixelHub Host",
  underConstruction: false,
  website: "https://www.pixelhubhost.com",
  contact: {
    email: "contato@pixelhubhost.com",
    discord: "https://discord.gg/mquaVhs5sr",
    whatsapp: "https://wa.me/5516993981473",
  },
  yearFounded: 2025,
  copyright: "PixelHub Host",
};

export const planLinks: Record<string, { monthly: string; quarterly: string }> = {
  oak: {
    monthly: "https://dash.pixelhubhost.com/market/1/checkout",
    quarterly: "https://dash.pixelhubhost.com/market/1/checkout",
  },
  stone: {
    monthly: "https://dash.pixelhubhost.com/market/2/checkout",
    quarterly: "https://dash.pixelhubhost.com/market/2/checkout",
  },
  iron: {
    monthly: "https://dash.pixelhubhost.com/market/3/checkout",
    quarterly: "https://dash.pixelhubhost.com/market/3/checkout",
  },
  diamond: {
    monthly: "https://dash.pixelhubhost.com/market/4/checkout",
    quarterly: "https://dash.pixelhubhost.com/market/4/checkout",
  },
  netherite: {
    monthly: "https://dash.pixelhubhost.com/market/5/checkout",
    quarterly: "https://dash.pixelhubhost.com/market/5/checkout",
  },
  dragon: {
    monthly: "https://dash.pixelhubhost.com/market/6/checkout",
    quarterly: "https://dash.pixelhubhost.com/market/6/checkout",
  },
};

export type Language = "en" | "pt" | "de" | "fr";
export type Theme = "light" | "dark";

export const PTERODACTYL_CONFIG = {
  API_URL: import.meta.env.VITE_PTERODACTYL_API_URL,
  CLIENT_API_KEY: import.meta.env.VITE_PTERODACTYL_CLIENT_API_KEY,
  APPLICATION_API_KEY: import.meta.env.VITE_PTERODACTYL_APPLICATION_API_KEY,
};

export type ServerStatus = {
  state: 'starting' | 'running' | 'stopping' | 'offline';
  memory: { current: number; limit: number };
  cpu: { current: number; limit: number };
};

export const SERVER_LIMITS = {
  MEMORY: 3 * 1024 * 1024 * 1024, // 3GB in bytes
  CPU: 200 // 200%
};