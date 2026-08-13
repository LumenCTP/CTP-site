// Production server for the built site. The TanStack Start build emits a portable
// fetch handler (dist/server/server.js) plus static client assets (dist/client);
// this wraps them in a Bun server on port 3000 — static files first, SSR for the
// rest. Run `bun run build` before starting. Restart it with `bun run publish`.
//
// In addition to the marketing site, this server hosts:
//   - /app/*          → the admin SPA (built web/dist, bundled into dist/app by
//                       publish.sh), with SPA-routing fallback to index.html.
//   - /api/*          → proxied to the admin API. Primary upstream is the local
//                       API on :3001 (dev sandbox); when that is unreachable or
//                       errors 5xx (e.g. on the live machine where no API
//                       process exists), it retries once against the dev API
//                       (https://cleartopay-dev.ctonew.app) so /api/* works on
//                       the live domain too.
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

// Admin SPA bundle — publish.sh copies web/dist → dist/app, so this path exists
// on BOTH the dev sandbox and the live machine (no sibling repo required).
const ADMIN_WEB_DIR = `${import.meta.dir}/dist/app`;

// Upstream targets. The local API (:3001) is the primary; on the live machine it
// does not exist, so /api/* falls back to the dev API.
const ADMIN_API = process.env.CTP_API_UPSTREAM || "http://localhost:3001";
const DEV_API = "https://cleartopay-dev.ctonew.app";

/**
 * Proxy an incoming request to an upstream origin, forwarding method, headers, and
 * body. The body must be read ONCE by the caller (an ArrayBuffer) so a failed
 * attempt can be retried against the fallback upstream with the same body.
 * `extraHeaders` are added to the proxied request (used to mark a fallback retry
 * so the receiving server never falls back again — otherwise a 5xx from the local
 * API would re-enter this same server via its public URL and loop forever).
 * Returns the upstream response with hop-by-hop headers stripped.
 */
async function proxyTo(req: Request, origin: string, body?: ArrayBuffer, extraHeaders?: Record<string, string>): Promise<Response> {
  const url = new URL(req.url);
  const targetUrl = `${origin}${url.pathname}${url.search}`;

  // Forward headers, rewriting Host for the upstream
  const headers = new Headers(req.headers);
  headers.set("host", new URL(origin).host);
  headers.delete("connection");
  if (extraHeaders) {
    for (const [k, v] of Object.entries(extraHeaders)) headers.set(k, v);
  }

  const proxyReq = new Request(targetUrl, {
    method: req.method,
    headers,
    body: body ?? undefined,
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

        // ── Proxy /api/* → admin API, with dev-API fallback ──
        if (pathname.startsWith("/api")) {
          // Read the body once up-front so a retry can reuse it (a Request body
          // can only be consumed once).
          const body = req.method !== "GET" && req.method !== "HEAD"
            ? await req.arrayBuffer()
            : undefined;

          // Never fall back if we ARE the fallback already: either this request
          // already carries our fallback marker (edge forwarded it), or it arrived
          // via the dev domain (host/x-forwarded-host). Without this guard a 5xx
          // from the local API would re-enter this same server through its public
          // URL and loop: request → local API 5xx → retry dev URL → edge → this
          // server → local API 5xx → retry dev URL → …
          const alreadyFellBack = req.headers.get("x-ctp-api-fallback") === "1";
          const viaDevHost = (req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "")
            .toLowerCase().includes("cleartopay-dev");
          const canFallback = !alreadyFellBack && !viaDevHost;

          const retry = () => proxyTo(req, DEV_API, body, { "x-ctp-api-fallback": "1" });
          const jsonError = (status: number, message: string) =>
            new Response(JSON.stringify({ error: message }), {
              status,
              headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            });

          try {
            const res = await proxyTo(req, ADMIN_API, body);
            if (canFallback && (res.status === 500 || res.status === 502 || res.status === 503 || res.status === 504)) {
              console.warn(`[serve] upstream ${ADMIN_API} returned ${res.status} for ${pathname} — retrying against ${DEV_API}`);
              try {
                return await retry();
              } catch (retryErr) {
                console.warn(`[serve] fallback ${DEV_API} also failed for ${pathname}: ${String(retryErr)}`);
                return jsonError(502, "API unavailable");
              }
            }
            return res;
          } catch (err) {
            if (canFallback) {
              console.warn(`[serve] upstream ${ADMIN_API} failed for ${pathname} — retrying against ${DEV_API}: ${String(err)}`);
              try {
                return await retry();
              } catch (retryErr) {
                console.warn(`[serve] fallback ${DEV_API} also failed for ${pathname}: ${String(retryErr)}`);
                return jsonError(502, "API unavailable");
              }
            }
            return jsonError(502, "API unavailable");
          }
        }

        // ── Admin SPA (production build): /app/* serves dist/app ──
        if (pathname.startsWith("/app")) {
          let filePath = ADMIN_WEB_DIR + pathname;
          const file = Bun.file(filePath);
          if (await file.exists()) {
            return new Response(file, {
              headers: filePath.endsWith(".css") ? { "Content-Type": "text/css" } :
                       filePath.endsWith(".js") ? { "Content-Type": "application/javascript" } : {},
            });
          }
          // Fallback to index.html for SPA routing (/app/login, /app/documents, …)
          return new Response(Bun.file(ADMIN_WEB_DIR + "/index.html"), {
            headers: { "Content-Type": "text/html" },
          });
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
