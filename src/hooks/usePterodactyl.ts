import { useState, useEffect, useCallback } from "react";
import { pterodactylService } from "../services/pterodactyl";
import type { ServerStatus } from "../config/config";

const disableExternalServices =
  import.meta.env.VITE_DISABLE_EXTERNAL_SERVICES === "true";

// Custom React hook to fetch and manage the status of a Pterodactyl server
export function usePterodactyl(serverId: string) {
  const [status, setStatus] = useState<ServerStatus | null>(null); // Holds the current server status
  const [loading, setLoading] = useState(true); // Loading state for status fetch
  const [error, setError] = useState<string | null>(null); // Error message, if any

  // Function to fetch server status from the API
  const fetchStatus = useCallback(async () => {
    if (disableExternalServices) {
      setStatus(null);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await pterodactylService.getServerStatus(serverId); // Call service to get status
      setStatus(data); // Update status state
    } catch {
      setError("Failed to fetch server status"); // Set error if fetch fails
    } finally {
      setLoading(false); // Always stop loading after fetch
    }
  }, [serverId]);

  // On mount and when serverId changes, start polling for server status
  useEffect(() => {
    if (disableExternalServices) {
      setStatus(null);
      setLoading(false);
      setError(null);
      return;
    }
    fetchStatus(); // Initial fetch
    const interval = setInterval(fetchStatus, 30000); // Poll every 30 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [fetchStatus]);

  // Return status, loading, error, and a manual refresh function
  return { status, loading, error, refresh: fetchStatus };
}
