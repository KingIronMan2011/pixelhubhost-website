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
const PTERODACTYL_API_KEY = process.env.PTERODACTYL_CLIENT_API_KEY;

// Proxy endpoint for Pterodactyl API
app.get('/pterodactyl', async (req, res) => {
  const { serverId, action } = req.query;
  if (!serverId) {
    return res.status(400).json({ error: 'Missing serverId' });
  }

  try {
    // Example: Get server details
    let url = `${PTERODACTYL_URL}/client/servers/${serverId}`;
    if (action === 'resources') {
      url += '/resources';
    }
    // Add more actions as needed

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${PTERODACTYL_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: 30000,
    });

    res.json(data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json({
      error: error.response?.data?.error || error.message || 'Unknown error',
    });
  }
});

// Add this route for WebSocket info
app.get('/pterodactyl/websocket', async (req, res) => {
  const { serverId } = req.query;
  if (!serverId) {
    return res.status(400).json({ error: 'Missing serverId' });
  }

  try {
    // 1. Get WebSocket token and URL
    const wsUrl = `${PTERODACTYL_URL}/client/servers/${serverId}/websocket`;
    const wsResponse = await axios.get(wsUrl, {
      headers: {
        Authorization: `Bearer ${PTERODACTYL_API_KEY}`,
        Accept: 'Application/vnd.pterodactyl.v1+json',
      },
      timeout: 30000,
    });

    const { token, socket } = wsResponse.data.data;

    // 2. Get resource usage details
    const resourcesUrl = `${PTERODACTYL_URL}/client/servers/${serverId}/resources`;
    const resourcesResponse = await axios.get(resourcesUrl, {
      headers: {
        Authorization: `Bearer ${PTERODACTYL_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: 30000,
    });

    // 3. Return both websocket info and resource usage
    res.json({
      token,
      socket,
      resources: resourcesResponse.data,
    });
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json({
      error: error.response?.data?.error || error.message || 'Unknown error',
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
