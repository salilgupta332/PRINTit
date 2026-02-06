import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  darkMode: "class",
  plugins: [
    react(),
    tailwindcss(), // ✅ REQUIRED for Tailwind v4
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // backend local
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
