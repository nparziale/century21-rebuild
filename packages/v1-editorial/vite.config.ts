import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  server: { port: 5173, host: true },
  preview: { port: 5173 },
  // Dev server mounts at /. Production build is served under /v1/ (both at
  // the Render root and inside the local showcase). Absolute base means the
  // SPA fallback HTML served at /v1/propiedad/:id still resolves assets to
  // /v1/assets/… instead of /v1/propiedad/assets/….
  base: command === 'build' ? '/v1/' : '/',
}));
