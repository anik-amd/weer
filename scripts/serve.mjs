/**
 * Serves the built site the way the host does: `shop.html` for `/shop`,
 * `shop/deck.html` for `/shop/deck`, and `404.html` with a 404 status for
 * anything else. It is here because `vite preview` falls back to the
 * single-page shell, which hides the pages the build actually generated.
 *
 *   npm run build && npm run preview
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.argv[2] || process.env.PORT || 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

const isFile = async (path) => {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
};

async function resolveFile(pathname) {
  const target = join(root, pathname);
  if (await isFile(target)) return target;

  // The build writes `shop.html` for `/shop`, the way the host serves it.
  if (!extname(pathname)) {
    const flat = `${target}.html`;
    if (await isFile(flat)) return flat;
  }

  const index = join(target, "index.html");
  if (await isFile(index)) return index;
  return null;
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  const file = await resolveFile(decodeURIComponent(pathname));

  if (!file) {
    const notFound = join(root, "404.html");
    res.writeHead(404, { "content-type": TYPES[".html"] });
    res.end(await readFile(notFound));
    console.log(`404 ${pathname}`);
    return;
  }

  res.writeHead(200, {
    "content-type": TYPES[extname(file)] || "application/octet-stream",
  });
  res.end(await readFile(file));
}).listen(port, () => {
  console.log(`the built site is on http://localhost:${port}`);
});
