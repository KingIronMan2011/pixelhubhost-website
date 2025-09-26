import axios from 'axios';
import 'dotenv/config';
import { Request, Response } from 'express';

const PTERODACTYL_URL = process.env.PTERODACTYL_API_URL;
const PTERODACTYL_CLIENT_API_KEY = process.env.PTERODACTYL_CLIENT_API_KEY;
const SERVER_ID = process.env.PTERODACTYL_TEST_SERVER_ID;
const RECAPTCHA_V3_SITE_KEY = process.env.RECAPTCHA_V3_SITE_KEY;

export default async function backendApi(req: Request, res: Response) {
  const { type } = req.query;

  if (!type) {
    return res.status(400).json({ error: 'Missing "type" query parameter' });
  }

  try {
    switch (type) {
      case 'pterodactylProxy':
        return await handlePterodactylProxy(req, res);
      case 'recaptchaConfig':
        return handleRecaptchaConfig(req, res);
      default:
        return res.status(400).json({ error: `Unknown type: ${type}` });
    }
  } catch (error) {
    console.error(`Error handling type "${type}":`, error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Handle Pterodactyl Proxy
async function handlePterodactylProxy(req: Request, res: Response) {
  const serverId = req.query.serverId || SERVER_ID;

  if (!serverId || typeof serverId !== 'string' || !serverId.trim()) {
    return res.status(400).json({
      error: 'Invalid server ID provided',
      details: 'Server ID must be a non-empty string',
    });
  }

  if (!PTERODACTYL_URL || !PTERODACTYL_CLIENT_API_KEY) {
    return res.status(500).json({
      error: 'Missing environment variables',
      details: 'PTERODACTYL_URL or PTERODACTYL_CLIENT_API_KEY not set',
    });
  }

  const endpoint = `/api/client/servers/${serverId}/resources`;

  const axiosConfig = {
    method: 'GET',
    url: `${PTERODACTYL_URL}${endpoint}`,
    headers: {
      Authorization: `Bearer ${PTERODACTYL_CLIENT_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    timeout: 8000,
  };

  const response = await axios(axiosConfig);

  // Normalize resource response for frontend
  const data = response.data;
  return res.json({
    state: data.attributes.current_state,
    memory: {
      current: data.attributes.resources.memory_bytes,
      limit: data.attributes.resources.memory_limit_bytes ?? 0,
    },
    cpu: {
      current: data.attributes.resources.cpu_absolute,
      limit: data.attributes.resources.cpu_limit ?? 100,
    },
  });
}

// Handle Recaptcha Config
function handleRecaptchaConfig(req: Request, res: Response) {
  if (!RECAPTCHA_V3_SITE_KEY) {
    return res.status(500).json({
      error: 'Recaptcha V3 site key not configured',
    });
  }

  res.json({
    siteKey: RECAPTCHA_V3_SITE_KEY,
  });
}
