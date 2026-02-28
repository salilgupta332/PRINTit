import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // backend local
        changeOrigin: true,
        secure: false,
      },
    },
    port: 5173,
    host: true,
    allowedHosts: [".replit.dev", ".janeway.replit.dev", "localhost"],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
