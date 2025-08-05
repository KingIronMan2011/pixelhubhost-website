// Main configuration file for PixelHub Host website

// General site/company configuration
export const config = {
  name: 'PixelHub Host', // Company/site name
  underConstruction: false, // Toggle for construction mode
  testErrorHandling: false, // Toggle for test error handling
  website: 'https://www.pixelhubhost.com', // Main website URL
  contact: {
    email: 'contato@pixelhubhost.com', // Support email
    discord: 'https://discord.gg/mquaVhs5sr', // Discord invite link
    whatsapp: 'https://wa.me/5516993981473', // WhatsApp contact link
  },
  yearFounded: 2025, // Year the company was founded
  copyright: 'PixelHub Host', // Copyright holder
  apiUrl: 'localhost', // API URL for internal services
};

// Links for each hosting plan and billing cycle (monthly/quarterly)
export const planLinks: Record<string, { monthly: string; quarterly: string }> = {
  leaf: {
    monthly: 'https://dash.pixelhubhost.com/market/16/checkout',
    quarterly: 'https://dash.pixelhubhost.com/market/16/checkout',
  },
  oak: {
    monthly: 'https://dash.pixelhubhost.com/market/1/checkout',
    quarterly: 'https://dash.pixelhubhost.com/market/1/checkout',
  },
  stone: {
    monthly: 'https://dash.pixelhubhost.com/market/2/checkout',
    quarterly: 'https://dash.pixelhubhost.com/market/2/checkout',
  },
  iron: {
    monthly: 'https://dash.pixelhubhost.com/market/3/checkout',
    quarterly: 'https://dash.pixelhubhost.com/market/3/checkout',
  },
  diamond: {
    monthly: 'https://dash.pixelhubhost.com/market/4/checkout',
    quarterly: 'https://dash.pixelhubhost.com/market/4/checkout',
  },
  netherite: {
    monthly: 'https://dash.pixelhubhost.com/market/5/checkout',
    quarterly: 'https://dash.pixelhubhost.com/market/5/checkout',
  },
  dragon: {
    monthly: 'https://dash.pixelhubhost.com/market/6/checkout',
    quarterly: 'https://dash.pixelhubhost.com/market/6/checkout',
  },
};

// Supported language codes for the site
export type LanguageKey = 'en' | 'pt' | 'de' | 'fr' | 'it'; // Italian supported

// Supported theme modes
export type Theme = 'light' | 'dark';

// Type definition for server status (used for test server status display)
export type ServerStatus = {
  state: 'running' | 'starting' | 'stopping' | 'offline';
  memory: { current: number; limit: number };
  cpu: { current: number; limit: number };
};

// Limits for the test server (used for progress bars, etc.)
export const SERVER_LIMITS = {
  MEMORY: 10 * 1024 * 1024 * 1024, // 3GB in bytes
  CPU: 100, // 100% (likely for multi-core virtualized CPU)
};
