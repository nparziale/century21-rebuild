import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  server: { port: 5175, host: true },
  preview: { port: 5175 },
  // Dev server mounts at /. Production build is served under /v3/ (both at
  // the Render root and inside the local showcase). Absolute base means the
  // SPA fallback HTML served at /v3/propiedad/:id still resolves assets to
  // /v3/assets/… instead of /v3/propiedad/assets/….
  base: command === 'build' ? '/v3/' : '/',
}));
