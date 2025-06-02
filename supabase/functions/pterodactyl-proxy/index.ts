// @deno-types="https://deno.land/std@0.168.0/http/server.d.ts"
// If running in Deno, ensure you have the correct permissions and Deno version.
// If running in Node.js, use a compatible HTTP server like 'express' or 'http'.
// Example for Node.js environment:
import express from 'express';

const app = express();
app.use(express.json());

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const serverId = url.searchParams.get('serverId') || Deno.env.get('VITE_PTERODACTYL_TEST_SERVER_ID')
    const action = url.searchParams.get('action')

    // Enhanced debug logging
    const envVars = {
      apiUrl: Deno.env.get('VITE_PTERODACTYL_API_URL'),
      clientKey: Deno.env.get('VITE_PTERODACTYL_CLIENT_API_KEY')?.slice(0, 8) + '...',
      serverId,
      applicationKey: Deno.env.get('VITE_PTERODACTYL_APPLICATION_API_KEY')?.slice(0, 8) + '...'
    };
    
    console.log('Environment variables and configuration:', envVars);

    // Enhanced input validation
    if (!serverId || typeof serverId !== 'string' || serverId.trim() === '') {
      console.error('Invalid server ID:', { serverId, type: typeof serverId });
      return new Response(
        JSON.stringify({ 
          error: 'Invalid server ID provided',
          details: 'Server ID must be a non-empty string',
          debug: { serverId, type: typeof serverId }
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const pterodactylUrl = Deno.env.get('VITE_PTERODACTYL_API_URL')
    const clientApiKey = Deno.env.get('VITE_PTERODACTYL_CLIENT_API_KEY')

    // Enhanced environment validation
    if (!pterodactylUrl || !clientApiKey) {
      console.error('Missing environment variables:', {
        hasUrl: !!pterodactylUrl,
        hasKey: !!clientApiKey
      })
      const missingVars: string[] = [];
      if (!pterodactylUrl) missingVars.push('VITE_PTERODACTYL_API_URL');
      if (!clientApiKey) missingVars.push('VITE_PTERODACTYL_CLIENT_API_KEY');
      
      return new Response(
        JSON.stringify({ 
          error: 'Pterodactyl configuration is missing',
          details: `Missing required environment variables: ${missingVars.join(', ')}`
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let endpoint = `/api/client/servers/${serverId}/resources`
    let method = 'GET'
    let body: string | null = null

    if (action) {
      if (!['start', 'stop', 'restart'].includes(action)) {
        return new Response(
          JSON.stringify({ 
            error: 'Invalid action provided',
            details: 'Action must be one of: start, stop, restart'
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      endpoint = `/api/client/servers/${serverId}/power`
      method = 'POST'
      body = JSON.stringify({ signal: action })
    }

    console.log('Making request to Pterodactyl:', {
      url: `${pterodactylUrl}${endpoint}`,
      method,
      hasBody: !!body
    });

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000) // 8 second timeout

    try {
      const response = await fetch(`${pterodactylUrl}${endpoint}`, {
        method,
        headers: {
          'Authorization': `Bearer ${clientApiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body,
        signal: controller.signal,
      })

      clearTimeout(timeout)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }))
        console.error('Pterodactyl API error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
          endpoint,
          method,
        })
        
        const statusMessages: Record<number, string> = {
          401: 'Authentication failed: Invalid API key',
          403: 'Access forbidden: Insufficient permissions',
          404: 'Server not found: Invalid server ID',
          500: 'Internal Pterodactyl server error',
          502: 'Unable to reach Pterodactyl server',
          504: 'Pterodactyl server timeout',
        }

        const errorMessage = statusMessages[response.status] || 'Failed to communicate with Pterodactyl API'
        
        return new Response(
          JSON.stringify({ 
            error: errorMessage,
            details: errorData.message || response.statusText,
            debug: {
              status: response.status,
              endpoint,
              method
            }
          }),
          { 
            status: response.status, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      const data = await response.json()
      console.log('Pterodactyl API response:', data);

      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (fetchError) {
      clearTimeout(timeout)
      if (fetchError.name === 'AbortError') {
        return new Response(
          JSON.stringify({ 
            error: 'Request timeout',
            details: 'The request to the Pterodactyl API timed out'
          }),
          { status: 504, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      throw fetchError
    }
  } catch (error) {
    console.error('Proxy error:', {
      message: error.message,
      stack: error.stack,
    })
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

function serve(arg0: (req: any) => Promise<Response>) {
  throw new Error('Function not implemented.');
}
