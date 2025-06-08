import axios from 'axios';
import type { ServerStatus } from '../config/config';
import languagesConfig from '../config/languages/Languages';

// Get Supabase environment variables for API base URL and anonymous key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create an Axios instance for API requests to Supabase Edge Functions
const api = axios.create({
  baseURL: `${supabaseUrl}/functions/v1`,
  headers: {
    Authorization: `Bearer ${supabaseAnonKey}`,
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout for requests
});

// Helper function to get error messages by key and language
function getErrorMessage(key: string, language: string, fallback: string) {
  return (
    (languagesConfig as unknown as Record<string, { texts?: Record<string, string> }>)?.[language]
      ?.texts?.[key] || fallback
  );
}

// Helper function to handle and throw user-friendly errors for API calls
function handleAxiosError(error: any, action: string, language = 'en') {
  if (error?.response?.status) {
    const status = error.response.status;
    switch (status) {
      case 401:
        throw new Error(getErrorMessage('errorAuth', language, 'Authentication error'));
      case 403:
        throw new Error(getErrorMessage('errorForbidden', language, 'Forbidden'));
      case 404:
        throw new Error(getErrorMessage('errorNotFound', language, 'Not found'));
      case 500:
        throw new Error(getErrorMessage('errorServer', language, 'Server error'));
      case 502:
        throw new Error(getErrorMessage('errorBadGateway', language, 'Bad gateway'));
      case 504:
        throw new Error(getErrorMessage('errorTimeout', language, 'Gateway timeout'));
      default:
        throw new Error(getErrorMessage('errorDefault', language, 'An error occurred'));
    }
  }
  throw new Error(
    getErrorMessage(
      'errorUnexpected',
      language,
      `An unexpected error occurred while trying to ${action} server`,
    ),
  );
}

// Service object for interacting with the Pterodactyl server management API
export const pterodactylService = {
  // Fetch the current status of a server by its ID
  async getServerStatus(serverId: string): Promise<ServerStatus> {
    try {
      if (!serverId?.trim()) throw new Error('Invalid server ID provided');
      const { data } = await api.get('/pterodactyl-proxy', {
        params: { serverId },
      });
      // The backend already returns { state, memory, cpu }
      if (typeof data.state !== 'string' || !data.memory || !data.cpu) {
        throw new Error('Invalid response format');
      }
      return data as ServerStatus;
    } catch (error) {
      handleAxiosError(error, 'fetch server status');
      throw new Error('Failed to fetch server status');
    }
  },

  // Start the server with the given ID
  async startServer(serverId: string): Promise<void> {
    try {
      if (!serverId?.trim()) throw new Error('Invalid server ID provided');
      await api.get('/pterodactyl-proxy', {
        params: { serverId, action: 'start' },
      });
    } catch (error) {
      handleAxiosError(error, 'start');
    }
  },

  // Stop the server with the given ID
  async stopServer(serverId: string): Promise<void> {
    try {
      if (!serverId?.trim()) throw new Error('Invalid server ID provided');
      await api.get('/pterodactyl-proxy', {
        params: { serverId, action: 'stop' },
      });
    } catch (error) {
      handleAxiosError(error, 'stop');
    }
  },

  // Restart the server with the given ID
  async restartServer(serverId: string): Promise<void> {
    try {
      if (!serverId?.trim()) throw new Error('Invalid server ID provided');
      await api.get('/pterodactyl-proxy', {
        params: { serverId, action: 'restart' },
      });
    } catch (error) {
      handleAxiosError(error, 'restart');
    }
  },
};
