/**
 * Generates the pages.
 *
 * The build renders every route to HTML and writes it into the publish
 * directory, so the site is served as documents. The browser then hydrates
 * the markup instead of drawing the page from nothing.
 *
 * The shell that Vite builds is the template: it already carries the hashed
 * asset links and the boot script, so all this does is drop the rendered
 * markup into its #root and give the page its own title.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PAGES, render } from "../.ssr/entry-server.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");

const MARKER = '<div id="root"></div>';

const escapeAttribute = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const template = await readFile(join(dist, "index.html"), "utf8");
const at = template.indexOf(MARKER);
if (at < 0) {
  throw new Error("the built shell has no #root to fill");
}
// The wrapper stays: the browser hydrates the markup inside it.
const head = template.slice(0, at);
const tail = template.slice(at + MARKER.length);

let count = 0;
for (const page of PAGES) {
  const body = render(page.path);

  let html = `${head}<div id="root">${body}</div>${tail}`;
  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeAttribute(page.title)}</title>`,
  );
  html = html.replace(
    /(<meta\s+name="description"\s+content=")[^"]*("\s*\/?>)/,
    `$1${escapeAttribute(page.description)}$2`,
  );

  const file = join(dist, page.file);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  count += 1;
  console.log(`  ${page.path.padEnd(16)} -> ${page.file}`);
}

console.log(`\nprerendered ${count} pages into dist/`);
