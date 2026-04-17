#!/usr/bin/env node
/**
 * Minimal zero-dep static server for century21-rebuild/dist-showcase/. Node 20+ uses the built-in
 * http module. Serves that directory at http://localhost:4321.
 */
import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..', 'century21-rebuild', 'dist-showcase');
const PORT = Number(process.env.PORT ?? 4321);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

function resolveSafe(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0] ?? '/');
  const rel = normalize(decoded).replace(/^\/+/, '');
  const abs = join(ROOT, rel);
  if (!abs.startsWith(ROOT)) return null;
  return abs;
}

function serveFile(abs, res) {
  const ext = extname(abs).toLowerCase();
  res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream');
  res.setHeader('Cache-Control', 'public, max-age=0');
  createReadStream(abs)
    .on('error', () => {
      res.statusCode = 500;
      res.end('500 error');
    })
    .pipe(res);
}

createServer((req, res) => {
  let abs = resolveSafe(req.url ?? '/');
  if (!abs) {
    res.statusCode = 400;
    return res.end('400 bad path');
  }
  try {
    let stat = statSync(abs);
    if (stat.isDirectory()) {
      abs = join(abs, 'index.html');
      stat = statSync(abs);
    }
    if (stat.isFile()) return serveFile(abs, res);
  } catch {
    // fall through
  }
  res.statusCode = 404;
  res.end(`404 not found: ${req.url}`);
}).listen(PORT, () => {
  console.log(`Showcase: http://localhost:${PORT}/`);
});
