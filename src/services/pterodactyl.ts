import axios from 'axios';
import type { ServerStatus } from '../config/pterodactyl';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const api = axios.create({
  baseURL: `${supabaseUrl}/functions/v1`,
  headers: {
    Authorization: `Bearer ${supabaseAnonKey}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

function handleAxiosError(error: any, action: string) {
  if (error?.response?.status) {
    const status = error.response.status;
    const msg = error.response.data?.error || error.response.data?.details || error.message;
    switch (status) {
      case 401: throw new Error('Authentication failed: Invalid API key');
      case 403: throw new Error('Access forbidden: Insufficient permissions');
      case 404: throw new Error('Server not found: Invalid server ID');
      case 500: throw new Error(`Pterodactyl server error: ${msg}`);
      case 502: throw new Error('Unable to reach Pterodactyl server');
      case 504: throw new Error('Pterodactyl server timeout');
      default: throw new Error(`Failed to ${action} server: ${msg}`);
    }
  }
  throw new Error(`An unexpected error occurred while trying to ${action} server`);
}

export const pterodactylService = {
  async getServerStatus(serverId: string): Promise<ServerStatus> {
    try {
      if (!serverId?.trim()) throw new Error('Invalid server ID provided');
      const { data } = await api.get('/pterodactyl-proxy', { params: { serverId } });
      const attr = data?.attributes;
      if (!attr?.resources || typeof attr.current_state === 'undefined')
        throw new Error('Invalid response format');
      return {
        state: attr.current_state,
        memory: {
          current: Number(attr.resources.memory_bytes) || 0,
          limit: Number(attr.resources.memory_limit_bytes) || 0,
        },
        cpu: {
          current: Number(attr.resources.cpu_absolute) || 0,
          limit: Number(attr.resources.cpu_limit) || 0,
        },
      };
    } catch (error) {
      handleAxiosError(error, 'fetch server status');
      throw new Error('Failed to fetch server status');
    }
  },

  async startServer(serverId: string): Promise<void> {
    try {
      if (!serverId?.trim()) throw new Error('Invalid server ID provided');
      await api.get('/pterodactyl-proxy', { params: { serverId, action: 'start' } });
    } catch (error) {
      handleAxiosError(error, 'start');
    }
  },

  async stopServer(serverId: string): Promise<void> {
    try {
      if (!serverId?.trim()) throw new Error('Invalid server ID provided');
      await api.get('/pterodactyl-proxy', { params: { serverId, action: 'stop' } });
    } catch (error) {
      handleAxiosError(error, 'stop');
    }
  },

  async restartServer(serverId: string): Promise<void> {
    try {
      if (!serverId?.trim()) throw new Error('Invalid server ID provided');
      await api.get('/pterodactyl-proxy', { params: { serverId, action: 'restart' } });
    } catch (error) {
      handleAxiosError(error, 'restart');
    }
  },
};