import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  server: { port: 5174, host: true },
  preview: { port: 5174 },
  // Dev server mounts at /. Production build is served under /v2/ (both at
  // the Render root and inside the local showcase). Absolute base means the
  // SPA fallback HTML served at /v2/propiedad/:id still resolves assets to
  // /v2/assets/… instead of /v2/propiedad/assets/….
  base: command === 'build' ? '/v2/' : '/',
}));
