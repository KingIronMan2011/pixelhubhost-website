import { useState, useEffect, useCallback } from "react";
import { pterodactylService } from "../services/pterodactyl";
import type { ServerStatus } from "../config/config";

export function usePterodactyl(serverId: string) {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await pterodactylService.getServerStatus(serverId);
      setStatus(data);
    } catch {
      setError("Failed to fetch server status");
    } finally {
      setLoading(false);
    }
  }, [serverId]);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 4000); // Less frequent polling for performance
    return () => clearInterval(interval);
  }, [fetchStatus]);

  return { status, loading, error, refresh: fetchStatus };
}
