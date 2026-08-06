// Production server for the built site. The TanStack Start build emits a portable
// fetch handler (dist/server/server.js) plus static client assets (dist/client);
// this wraps them in a Bun server on port 3000 — static files first, SSR for the
// rest. Run `bun run build` before starting. Restart it with `bun run publish`.
//
// Starting a new instance supersedes the old one: it frees the port no matter
// which user owns the current server (provisioning starts it as `engine`; a team
// member's `bun run publish` runs as their own user), so publish never collides
// with an already-running server. Every sandbox user has passwordless sudo, so
// the takeover works across user boundaries.
import handler from "./dist/server/server.js";

// Pinned, NOT read from the environment. The published preview URL
// (<label>.<PUBLIC_SITE_DOMAIN>) is reverse-proxied to 0.0.0.0:3000 inside the
// sandbox, so the default site MUST bind there. Bun auto-loads .env files, so
// honouring process.env.PORT/HOST would let a stray env var or a .env in the site
// dir silently move the site off :3000 (or onto loopback) and break the public URL.
const PORT = 3000;
const HOST = "0.0.0.0";
const CLIENT_DIR = `${import.meta.dir}/dist/client`;

// Free PORT regardless of which user owns the current listener. lsof runs under
// sudo so it can see (and the kill can signal) a process owned by another user;
// the loop waits for the socket to actually release before we bind.
const freePort =
  `for _ in $(seq 1 25); do ` +
  `pids=$(lsof -t -iTCP:${String(PORT)} -sTCP:LISTEN 2>/dev/null || true); ` +
  `if [ -z "$pids" ]; then exit 0; fi; ` +
  `kill $pids 2>/dev/null || true; sleep 0.2; ` +
  `done`;

// Upstream targets
const ADMIN_API = "http://localhost:3001";
const ADMIN_WEB_DIR = `${import.meta.dir}/../clear-to-pay/web/dist`;

/**
 * Proxy an incoming request to an upstream origin, forwarding method, headers, and
 * body. Returns the upstream response with hop-by-hop headers stripped.
 */
async function proxyTo(req: Request, origin: string, rewritePath?: (pathname: string) => string): Promise<Response> {
  const url = new URL(req.url);
  let targetPath = url.pathname;
  if (rewritePath) targetPath = rewritePath(targetPath);

  const targetUrl = `${origin}${targetPath}${url.search}`;

  // Forward headers, rewriting Host for the upstream
  const headers = new Headers(req.headers);
  headers.set("host", new URL(origin).host);
  headers.delete("connection");

  const proxyReq = new Request(targetUrl, {
    method: req.method,
    headers,
    body: req.method !== "GET" && req.method !== "HEAD"
      ? await req.arrayBuffer()
      : undefined,
  });

  const res = await fetch(proxyReq);

  // Strip hop-by-hop headers from the response
  const resHeaders = new Headers(res.headers);
  resHeaders.delete("transfer-encoding");
  resHeaders.delete("connection");
  resHeaders.delete("keep-alive");
  resHeaders.set("Access-Control-Allow-Origin", "*");

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: resHeaders,
  });
}

// Take over the port, re-freeing and retrying if another publish grabbed it in the
// gap between freeing and binding (last publish wins). Bun.serve throws EADDRINUSE
// synchronously, so without this a raced publish would die while the shell already
// reported success.
for (let attempt = 1; ; attempt++) {
  await Bun.$`sudo sh -c ${freePort}`.quiet().nothrow();
  try {
    Bun.serve({
      port: PORT,
      hostname: HOST,
      async fetch(req) {
        const url = new URL(req.url);
        const { pathname } = url;

        // ── Proxy /api/* → admin API (port 3001) ──
        if (pathname.startsWith("/api")) {
          return proxyTo(req, ADMIN_API);
        }

        // ── Admin SPA (production build) → serve /app/* and /assets/* ──
        if (pathname.startsWith("/app") || pathname.startsWith("/assets")) {
          let filePath: string;
          if (pathname.startsWith("/assets")) {
            filePath = ADMIN_WEB_DIR + pathname;
          } else {
            // SPA: all /app/* routes serve index.html (client-side routing)
            filePath = ADMIN_WEB_DIR + "/index.html";
          }
          const file = Bun.file(filePath);
          if (await file.exists()) {
            return new Response(file, {
              headers: filePath.endsWith(".css") ? { "Content-Type": "text/css" } :
                       filePath.endsWith(".js") ? { "Content-Type": "application/javascript" } : {},
            });
          }
          // Fallback to index.html for SPA routing
          if (pathname.startsWith("/app")) {
            return new Response(Bun.file(ADMIN_WEB_DIR + "/index.html"));
          }
        }

        // ── Marketing site: static files first, then SSR ──
        if (pathname !== "/") {
          const file = Bun.file(CLIENT_DIR + pathname);
          if (await file.exists()) return new Response(file);
        }
        return (
          handler as { fetch: (r: Request) => Response | Promise<Response> }
        ).fetch(req);
      },
    });
    break;
  } catch (err) {
    if (attempt >= 10) throw err;
    await Bun.sleep(200);
  }
}

console.log(`team-site serving on http://${HOST}:${String(PORT)}`);
