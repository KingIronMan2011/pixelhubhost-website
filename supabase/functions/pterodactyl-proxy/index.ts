const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

export default async function pterodactylProxy(
  req: Request
): Promise<Response> {
  // Handle OPTIONS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Check if external services are disabled
  const disableExternalServices =
    Deno.env.get("VITE_DISABLE_EXTERNAL_SERVICES") === "true";
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
    // Read search params
    const url = new URL(req.url);
    const serverId =
      url.searchParams.get("serverId") ||
      Deno.env.get("VITE_PTERODACTYL_TEST_SERVER_ID");
    const action = url.searchParams.get("action");

    // Validate server ID
    if (!serverId || !serverId.trim()) {
      return new Response(
        JSON.stringify({
          error: "Invalid server ID provided",
          details: "Server ID must be a non-empty string",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate required environment variables
    const pterodactylUrl = Deno.env.get("VITE_PTERODACTYL_API_URL");
    const clientApiKey = Deno.env.get("VITE_PTERODACTYL_CLIENT_API_KEY");
    if (!pterodactylUrl || !clientApiKey) {
      return new Response(
        JSON.stringify({
          error: "Missing environment variables",
          details:
            "VITE_PTERODACTYL_API_URL or VITE_PTERODACTYL_CLIENT_API_KEY not set",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Build request based on "action" param
    let endpoint = `/api/client/servers/${serverId}/resources`;
    let method = "GET";
    let body: string | undefined;

    if (action) {
      if (!["start", "stop", "restart"].includes(action)) {
        return new Response(
          JSON.stringify({
            error: "Invalid action provided",
            details: "Must be start, stop, or restart",
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

    // Make request to Pterodactyl
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

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
        const errorData = await response.json().catch(() => ({
          message: "Unknown error",
        }));
        return new Response(
          JSON.stringify({
            error: "Pterodactyl API error",
            status: response.status,
            details: errorData.message || response.statusText,
          }),
          {
            status: response.status,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // If successful, return the data
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
            details: "Request to Pterodactyl timed out",
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
}
