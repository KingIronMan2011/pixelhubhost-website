import axios from 'axios';
import type { ServerStatus } from '../config/config';
import languagesConfig from '../config/languages/Languages';
import i18n from '../i18n'; // <-- Add this import

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
function handleAxiosError(error: any, action: string, language?: string) {
  // Use i18n.language if language is not provided
  const lang = language || i18n.language || 'en';
  if (error?.response?.status) {
    const status = error.response.status;
    switch (status) {
      case 401:
        throw new Error(getErrorMessage('errorAuth', lang, 'Authentication error'));
      case 403:
        throw new Error(getErrorMessage('errorForbidden', lang, 'Forbidden'));
      case 404:
        throw new Error(getErrorMessage('errorNotFound', lang, 'Not found'));
      case 500:
        throw new Error(getErrorMessage('errorServer', lang, 'Server error'));
      case 502:
        throw new Error(getErrorMessage('errorBadGateway', lang, 'Bad gateway'));
      case 504:
        throw new Error(getErrorMessage('errorTimeout', lang, 'Gateway timeout'));
      default:
        throw new Error(getErrorMessage('errorDefault', lang, 'An error occurred'));
    }
  }
  throw new Error(
    getErrorMessage(
      'errorUnexpected',
      lang,
      `An unexpected error occurred while trying to ${action} server`,
    ),
  );
}

// Service object for interacting with the Pterodactyl server management API
export const pterodactylService = {
  // Fetch the current status of a server by its ID
  async getServerStatus(serverId: string, language?: string): Promise<ServerStatus> {
    try {
      if (!serverId?.trim())
        throw new Error(
          getErrorMessage(
            'errorInvalidServerId',
            language || i18n.language || 'en',
            'Invalid server ID provided',
          ),
        );
      const { data } = await api.get('/pterodactyl-proxy', {
        params: { serverId },
      });
      // The backend already returns { state, memory, cpu }
      if (typeof data.state !== 'string' || !data.memory || !data.cpu) {
        throw new Error(
          getErrorMessage(
            'errorInvalidResponse',
            language || i18n.language || 'en',
            'Invalid response format',
          ),
        );
      }
      return data as ServerStatus;
    } catch (error) {
      handleAxiosError(error, 'fetch server status', language);
      throw new Error(
        getErrorMessage(
          'errorFetchStatus',
          language || i18n.language || 'en',
          'Failed to fetch server status',
        ),
      );
    }
  },

  // Start the server with the given ID
  async startServer(serverId: string, language?: string): Promise<void> {
    try {
      if (!serverId?.trim())
        throw new Error(
          getErrorMessage(
            'errorInvalidServerId',
            language || i18n.language || 'en',
            'Invalid server ID provided',
          ),
        );
      await api.get('/pterodactyl-proxy', {
        params: { serverId, action: 'start' },
      });
    } catch (error) {
      handleAxiosError(error, 'start', language);
    }
  },

  // Stop the server with the given ID
  async stopServer(serverId: string, language?: string): Promise<void> {
    try {
      if (!serverId?.trim())
        throw new Error(
          getErrorMessage(
            'errorInvalidServerId',
            language || i18n.language || 'en',
            'Invalid server ID provided',
          ),
        );
      await api.get('/pterodactyl-proxy', {
        params: { serverId, action: 'stop' },
      });
    } catch (error) {
      handleAxiosError(error, 'stop', language);
    }
  },

  // Restart the server with the given ID
  async restartServer(serverId: string, language?: string): Promise<void> {
    try {
      if (!serverId?.trim())
        throw new Error(
          getErrorMessage(
            'errorInvalidServerId',
            language || i18n.language || 'en',
            'Invalid server ID provided',
          ),
        );
      await api.get('/pterodactyl-proxy', {
        params: { serverId, action: 'restart' },
      });
    } catch (error) {
      handleAxiosError(error, 'restart', language);
    }
  },
};
