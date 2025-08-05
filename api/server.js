import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// --- Pterodactyl API credentials ---
const PTERODACTYL_URL = process.env.PTERODACTYL_API_URL;
const PTERODACTYL_CLIENT_API_KEY = process.env.PTERODACTYL_CLIENT_API_KEY;
const PTERODACTYL_APPLICATION_API_KEY = process.env.PTERODACTYL_APPLICATION_API_KEY;
const SERVER_ID = process.env.PTERODACTYL_TEST_SERVER_ID;
// --- Recaptcha V3 site key ---
const RECAPTCHA_V3_SITE_KEY = process.env.RECAPTCHA_V3_SITE_KEY;

// Pterodactyl proxy route
app.get('/pterodactyl/proxy', async (req, res) => {
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

  try {
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
  } catch (error) {
    const status = error.response?.status || 500;
    return res.status(status).json({
      error: error.response?.data?.error || error.message || 'Unknown error',
      details: error.response?.data || undefined,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
