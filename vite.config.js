import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: '/Haresh_badga786/',
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Proxy the /api calls to backend
    },
  },
});
