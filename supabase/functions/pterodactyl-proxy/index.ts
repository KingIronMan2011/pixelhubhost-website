// @deno-types="https://deno.land/std@0.168.0/http/server.d.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"; // <-- Use the real Deno serve

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

// serve(...) must be imported from Deno’s standard library
serve(async (req) => {
  // Handle CORS preflight first:
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Read environment variables AFTER we pass OPTIONS
  const disableExternalServices =
    Deno.env.get("VITE_DISABLE_EXTERNAL_SERVICES") === "true";

  // Skip all logic if external services are disabled
  if (disableExternalServices) {
    return new Response(
      JSON.stringify({
        message: "External services are disabled.",
        status: "offline",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    const url = new URL(req.url);
    const serverId =
      url.searchParams.get("serverId") ||
      Deno.env.get("VITE_PTERODACTYL_TEST_SERVER_ID");
    const action = url.searchParams.get("action");

    const pterodactylUrl = Deno.env.get("VITE_PTERODACTYL_API_URL");
    const clientApiKey = Deno.env.get("VITE_PTERODACTYL_CLIENT_API_KEY");

    // Validate environment
    if (!pterodactylUrl || !clientApiKey) {
      return new Response(
        JSON.stringify({
          error: "Pterodactyl configuration is missing",
          details: "Missing required environment variables",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate server ID
    if (!serverId || !serverId.trim()) {
      return new Response(
        JSON.stringify({
          error: "Invalid server ID",
          details: "Server ID must be a non-empty string",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let endpoint = `/api/client/servers/${serverId}/resources`;
    let method = "GET";
    let body: string | null = null;

    // If we have an action (start/stop/restart), override endpoint/method
    if (action) {
      if (!["start", "stop", "restart"].includes(action)) {
        return new Response(
          JSON.stringify({
            error: "Invalid action",
            details: "Action must be start, stop, or restart",
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      endpoint = `/api/client/servers/${serverId}/power`;
      method = "POST";
      body = JSON.stringify({ signal: action });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8 seconds

    try {
      const response = await fetch(`${pterodactylUrl}${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${clientApiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error" }));
        return new Response(
          JSON.stringify({
            error: "Pterodactyl error",
            details: errorData.message || response.statusText,
            debug: { status: response.status, endpoint, method },
          }),
          {
            status: response.status,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (fetchError) {
      clearTimeout(timeout);
      if (fetchError.name === "AbortError") {
        return new Response(
          JSON.stringify({
            error: "Request timeout",
            details: "The request to the Pterodactyl API timed out",
          }),
          {
            status: 504,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      throw fetchError;
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
