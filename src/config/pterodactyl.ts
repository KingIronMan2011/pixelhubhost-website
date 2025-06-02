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