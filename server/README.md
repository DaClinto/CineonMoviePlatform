Proxy server

This small server provides an endpoint `/api/stream?embedUrl=...` that fetches the provided embed page and attempts to extract a `.m3u8` (HLS) URL.

Usage (development):

1. Install dependencies:

```bash
npm install
```

2. Start the proxy server:

```bash
npm run start:server
```

The server listens on port 3001 by default. The frontend expects the server to be reachable at `/api/stream` relative to the dev server; configure CORS or a dev proxy if needed.

Security & legal:

- Scraping and proxying third-party video providers may violate terms-of-service. Use only with permission.
- This proxy does NOT remove DRM or otherwise circumvent protections; it only looks for HLS manifest URLs in the embed HTML.
