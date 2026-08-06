import { readFile } from 'node:fs/promises';

const HTML = await readFile('index.html', 'utf8');
const PORT = 3000;

Bun.serve({
  port: PORT,
  fetch(req) {
    return new Response(HTML, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  },
});

console.log(`Site live on port ${PORT}`);
