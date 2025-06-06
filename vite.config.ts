import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// This is the main Vite configuration file for the project.
// It sets up plugins, dev server options, and dependency optimization.

export default defineConfig({
  plugins: [react()], // Enables React Fast Refresh and JSX support

  optimizeDeps: {
    exclude: ["lucide-react"], // Exclude "lucide-react" from dependency pre-bundling (if you want to handle it differently)
  },

  server: {
    host: true, // Listen on all network interfaces (useful for LAN/dev containers)
    port: 5173, // Dev server will run on port 5173
    hmr: {
      protocol: "ws", // Use WebSocket for Hot Module Replacement
      host: "localhost", // HMR host
      port: 5173, // HMR port
      clientPort: 5173, // HMR client port
    },
    watch: {
      usePolling: true, // Use polling for file changes (helps in some environments like Docker/WSL)
    },
    allowedHosts: ["website.pixelhubhost.com", "www.pixelhubhost.com"], // Only allow these hosts to access the dev server
  },
});
