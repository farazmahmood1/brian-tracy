// Runs after `vite build`.
//
// The site is a client-rendered SPA, so without this every URL would ship the
// homepage <title>, description and canonical until JavaScript runs. Link
// previews (LinkedIn, Slack, WhatsApp) never run JavaScript, and search engines
// index the raw HTML first.
//
// For each known route this writes dist/<route>/index.html with the correct
// head tags, and regenerates dist/sitemap.xml from the same data.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const SITE_URL = "https://forrof.io";
const HREFLANGS = ["en", "x-default"];

const routes = JSON.parse(readFileSync(join(root, "src/constants/seoRoutes.json"), "utf8"));
const template = readFileSync(join(dist, "index.html"), "utf8");

// Case studies live in a TS data file that can't be imported from Node
// (it reads import.meta.env), so pull the three fields we need with a regex.
const projectsSource = readFileSync(join(root, "src/data/projects.ts"), "utf8");
const projectPattern = /id:\s*"([^"]+)",\s*title:\s*"[^"]*",\s*metaTitle:\s*"([^"]+)",\s*metaDescription:\s*"([^"]+)"/g;
for (const [, id, title, description] of projectsSource.matchAll(projectPattern)) {
  routes[`/project/${id}`] = { title, description, keywords: "", priority: 0.6 };
}

const escapeAttr = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const escapeText = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const setContent = (html, attr, key, value) => {
  const pattern = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`, "s");
  if (!pattern.test(html)) throw new Error(`index.html is missing <meta ${attr}="${key}">`);
  return html.replace(pattern, `$1${escapeAttr(value)}$2`);
};

const renderRoute = (path, meta) => {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeText(meta.title)}</title>`);
  html = setContent(html, "name", "description", meta.description);
  html = setContent(html, "name", "keywords", meta.keywords ?? "");
  html = setContent(html, "property", "og:title", meta.title);
  html = setContent(html, "property", "og:description", meta.description);
  html = setContent(html, "property", "og:url", url);
  html = setContent(html, "name", "twitter:title", meta.title);
  html = setContent(html, "name", "twitter:description", meta.description);
  if (meta.noindex) html = setContent(html, "name", "robots", "noindex, follow");

  const alternates = HREFLANGS.map((lang) => `  <link rel="alternate" hreflang="${lang}" href="${url}" />`).join("\n");
  const canonical = /<link rel="canonical" href="[^"]*" \/>/;
  if (!canonical.test(html)) throw new Error("index.html is missing the canonical link");
  return html.replace(canonical, `<link rel="canonical" href="${url}" />\n${alternates}`);
};

let written = 0;
for (const [path, meta] of Object.entries(routes)) {
  const file = path === "/" ? join(dist, "index.html") : join(dist, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, renderRoute(path, meta));
  written++;
}

const today = new Date().toISOString().slice(0, 10);
const urls = Object.entries(routes)
  .filter(([, meta]) => meta.sitemap !== false)
  .sort(([, a], [, b]) => (b.priority ?? 0.5) - (a.priority ?? 0.5))
  .map(([path, meta]) => {
    const loc = `${SITE_URL}${path === "/" ? "/" : path}`;
    const alternates = HREFLANGS.map((lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${loc}" />`).join("\n");
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n${alternates}\n    <priority>${(meta.priority ?? 0.5).toFixed(1)}</priority>\n  </url>`;
  });

writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`
);

console.log(`seo-postbuild: wrote ${written} route pages and a sitemap with ${urls.length} URLs`);
