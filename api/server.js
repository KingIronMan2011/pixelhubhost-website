import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import https from 'https';
import http from 'http';

dotenv.config();

const app = express();
app.disable("x-powered-by");
const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || 'api.www.pixelhubhost.com';

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(
  helmet({
    hsts: process.env.USE_HTTPS === "true",
  }),
);
app.use(express.json({ limit: "10mb" }));

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

app.get('/recaptcha-config', (req, res) => {
  if (!RECAPTCHA_V3_SITE_KEY) {
    return res.status(500).json({
      error: 'Recaptcha V3 site key not configured',
    });
  }

  res.json({
    siteKey: RECAPTCHA_V3_SITE_KEY,
  });
});

if (process.env.USE_HTTPS === "true") {
  const sslOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
  };
  https.createServer(sslOptions, app).listen(PORT, '0.0.0.0', () => {
    console.log(`API running on https://${DOMAIN}:${PORT}`);
  });
} else if (isDevelopment) {
  http.createServer(app).listen(PORT, '0.0.0.0', () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
} else {
  console.error(
    "Production must use HTTPS. Set USE_HTTPS=true and provide SSL certs.",
  );
  process.exit(1);
}