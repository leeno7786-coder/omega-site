import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    manifest: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, 'index.html'),
        omega3: path.resolve(__dirname, 'omega-3/index.html'),
      },
    },
  },
});
