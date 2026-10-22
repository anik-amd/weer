/**
 * Generates the pages.
 *
 * The build renders every route to HTML and writes it into the publish
 * directory, so the site is served as documents. The browser then hydrates
 * the markup instead of drawing the page from nothing.
 *
 * The shell that Vite builds is the template: it already carries the hashed
 * asset links and the boot script, so all this does is drop the rendered
 * markup into its #root and give the page its own head.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PAGES, PHOTOS, render, SITE } from "../.ssr/entry-server.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");

const MARKER = '<div id="root"></div>';

const escapeAttribute = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const escapeXml = (value) =>
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

/** The head every page needs: who it is, where it lives, what it is. */
function metaFor(page) {
  const url = `${SITE.url}${page.path === "/" ? "/" : page.path}`;
  const image = `${SITE.url}${SITE.image}`;
  // The card's description is the photograph's own alt text, not a new one.
  const card = Object.values(PHOTOS).find((p) => p.src === SITE.image);
  return [
    `<link rel="canonical" href="${escapeAttribute(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeAttribute(SITE.name)}" />`,
    `<meta property="og:locale" content="${escapeAttribute(SITE.locale)}" />`,
    `<meta property="og:title" content="${escapeAttribute(page.title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(page.description)}" />`,
    `<meta property="og:url" content="${escapeAttribute(url)}" />`,
    `<meta property="og:image" content="${escapeAttribute(image)}" />`,
    card
      ? `<meta property="og:image:alt" content="${escapeAttribute(card.alt)}" />`
      : "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttribute(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttribute(page.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttribute(image)}" />`,
  ]
    .filter(Boolean)
    .join("\n    ");
}

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
  html = html.replace("</head>", `    ${metaFor(page)}\n  </head>`);

  const file = join(dist, page.file);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  count += 1;
  console.log(`  ${page.path.padEnd(16)} -> ${page.file}`);
}

/** The map, so a crawler does not have to guess what exists. */
const urls = PAGES.filter((p) => p.path !== "/404")
  .map((p) => {
    const loc = `${SITE.url}${p.path}`;
    return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n  </url>`;
  })
  .join("\n");

await writeFile(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

/** And the rule for what a crawler may fetch. */
await writeFile(
  join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`,
);

console.log(`\nprerendered ${count} pages, plus sitemap.xml and robots.txt`);
