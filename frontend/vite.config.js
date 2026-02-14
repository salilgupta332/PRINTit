import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ✅ REQUIRED for Tailwind v4
  ],
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
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
  }
});