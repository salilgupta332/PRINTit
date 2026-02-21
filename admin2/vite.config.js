import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path"
export default defineConfig({
  base: "/",  // 🔥 CHANGED FROM "/" TO "/admin/"
  build: {
    outDir: "dist",
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
    port: 5174,
    host: true,
  },
});