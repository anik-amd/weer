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
import { PAGES, render, SITE, schemaJson } from "../.ssr/entry-server.js";

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
  return [
    `<link rel="canonical" href="${escapeAttribute(url)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<meta name="author" content="WEER Studio" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeAttribute(SITE.name)}" />`,
    `<meta property="og:locale" content="${escapeAttribute(SITE.locale)}" />`,
    `<meta property="og:title" content="${escapeAttribute(page.title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(page.description)}" />`,
    `<meta property="og:url" content="${escapeAttribute(url)}" />`,
    `<meta property="og:image" content="${escapeAttribute(image)}" />`,
    `<meta property="og:image:secure_url" content="${escapeAttribute(image)}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="${SITE.imageWidth}" />`,
    `<meta property="og:image:height" content="${SITE.imageHeight}" />`,
    `<meta property="og:image:alt" content="${escapeAttribute(SITE.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttribute(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttribute(page.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttribute(image)}" />`,
    `<meta name="twitter:image:alt" content="${escapeAttribute(SITE.imageAlt)}" />`,
  ].join("\n    ");
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

  // The structured data, then the head. The JSON is escaped so a stray
  // "</script>" in the content cannot close the tag early.
  const json = schemaJson(page.path).replace(/</g, "\\u003c");
  const extra = [
    `    ${metaFor(page)}`,
    `    <script type="application/ld+json">${json}</script>`,
  ].join("\n");
  html = html.replace("</head>", `${extra}\n  </head>`);

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

/**
 * The rule for what may crawl. Everything is allowed, and the assistants
 * are named one by one: this is a public design study, and being read and
 * cited is the whole point of it.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "CCBot",
  "Bytespider",
  "Meta-ExternalAgent",
  "cohere-ai",
  "YouBot",
  "anthropic-ai",
];

await writeFile(
  join(dist, "robots.txt"),
  [
    "User-agent: *",
    "Allow: /",
    "",
    "# Search and answer engines are welcome here. This is a public design",
    "# study and being read and cited is the point of it.",
    ...aiCrawlers.map((name) => `User-agent: ${name}\nAllow: /`),
    "",
    `Sitemap: ${SITE.url}/sitemap.xml`,
    "",
  ].join("\n"),
);

/**
 * The plain-text guide for an assistant that would rather read a page of
 * prose than work out a site map. It is a convention, not a standard, and
 * it costs nothing to offer one.
 */
const llms = [
  `# ${SITE.name}`,
  "",
  "> A fictional e-commerce site for a Rotterdam studio that makes t-shirts out of",
  "> the t-shirts you already own. The brand, the products, the prices, the team and",
  "> the numbers are all invented, and the copy, the art and the code were written by",
  "> AI. It is a design study, not a shop: no order is taken and no payment is made.",
  "",
  "## Pages",
  "",
  ...PAGES.filter((p) => p.path !== "/404").map(
    (p) => `- [${p.title}](${SITE.url}${p.path}): ${p.description}`,
  ),
  "",
  "## What the site says",
  "",
  "- Four reclaimed t-shirts are shredded, spun into yarn and knitted into one new",
  "  body. The first dye batch sets the body colour, the other three become the marl",
  "  you can see in the fabric.",
  "- Every garment is a drawing made in code, not a photograph.",
  "- The photographs show the world of reclaimed fibre, not the studio. They were",
  "  found in open collections and are credited on the page and in the footer.",
  "- The contact form and the order form hand their message to the visitor's own",
  "  email client. There is no backend and no payment provider.",
  "",
  "## Notes",
  "",
  `- The source is on GitHub: ${SITE.repo}`,
  "- The site ships in a light and a dark theme, and remembers which you chose.",
  "",
].join("\n");

await writeFile(join(dist, "llms.txt"), llms);

console.log(
  `\nprerendered ${count} pages, plus sitemap.xml, robots.txt and llms.txt`,
);
