#!/usr/bin/env bash
# Rebuild the site and (re)start the production server on port 3000.
# Build runs in the foreground so errors surface; the server is launched in a new
# session (setsid) so it keeps running after this script — and your shell — exits.
# serve.ts frees the port (across user boundaries, retrying on races) before
# binding, so this is safe to re-run no matter who started the current server.
set -euo pipefail
cd "$(dirname "$0")"

# Group-writable so any team member can publish over another member's build.
umask 002
mkdir -p .run

# The workspace starts as sources only (the coming-soon placeholder serves from
# the image's pre-built copy), so the first publish installs deps here. No-op
# once node_modules is current.
bun install
bun run build
# Bundle the admin SPA (web/dist) into dist/app so serve.ts can serve /app/*
# from a path that exists on both dev and live machines (no sibling repo
# required). Idempotent: rm -rf then cp -r. Only web/dist contents are copied.
if [ -f ../clear-to-pay/web/dist/index.html ]; then
  rm -rf dist/app
  cp -R ../clear-to-pay/web/dist dist/app
  echo "admin SPA bundled into dist/app"
else
  # No local web build (e.g. publish running outside the sandbox tree). Keep any
  # dist/app that was shipped with this copy rather than wiping it.
  if [ -f dist/app/index.html ]; then
    echo "warning: ../clear-to-pay/web/dist not found — keeping existing dist/app" >&2
  else
    echo "error: ../clear-to-pay/web/dist not found and no dist/app present — /app/* will not work" >&2
    exit 1
  fi
fi
setsid nohup bun run start > .run/server.log 2>&1 < /dev/null &

# Wait for the new server to actually answer before reporting success, so a
# startup crash surfaces here instead of silently leaving the old page live.
for _ in $(seq 1 50); do
  if curl -sf -o /dev/null http://localhost:3000; then
    echo "site published; serving on port 3000"
    exit 0
  fi
  sleep 0.2
done
echo "warning: published, but the server isn't responding — check .run/server.log" >&2
exit 1
