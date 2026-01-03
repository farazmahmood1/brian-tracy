import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import { preview } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.resolve(__dirname, "dist");

// Parse IDs from data files
const articlesData = fs.readFileSync(path.resolve(__dirname, "src/data/articles.ts"), "utf-8");
const articleIds = [...articlesData.matchAll(/id:\s*["']([^"']+)["']/g)].map((m) => m[1]);

const projectsData = fs.readFileSync(path.resolve(__dirname, "src/data/projects.ts"), "utf-8");
const projectIds = [...projectsData.matchAll(/id:\s*["']([^"']+)["']/g)].map((m) => m[1]);

const routes = [
    "/",
    "/services",
    "/projects",
    "/articles",
    "/contact",
    ...articleIds.map((id) => `/articles/${id}`),
    ...projectIds.map((id) => `/project/${id}`),
];

console.log(`Routes to prerender: ${routes.length}`);

async function prerender() {
    console.log("Starting preview server...");
    const previewServer = await preview({
        preview: { port: 4173, open: false },
        root: __dirname,
        configFile: false,
        build: { outDir: OUTPUT_DIR } // Ensure it points to dist
    });

    const BASE_URL = `http://localhost:4173`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (const route of routes) {
        console.log(`Prerendering: ${route}`);

        // Create directory
        const routePath = route === "/" ? "/" : route;
        // Remove leading slash for path join if not root
        const relativeRoute = routePath.startsWith("/") ? routePath.slice(1) : routePath;
        const dir = path.join(OUTPUT_DIR, relativeRoute);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        try {
            await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle0" });

            // Get HTML
            const html = await page.content();

            // Write to file (index.html in the folder)
            // Special case for root: avoid overwriting if index.html is the source? 
            // No, root index.html is the SPA entry. We are overwriting it with the rendered version?
            // Usually creating specific folders is safer.
            // For root "/", we might want to overwrite dist/index.html OR just rely on client side for root?
            // SEO usually wants root rendered too.
            // But overwriting dist/index.html might break SPA routing if not handled locally?
            // If we overwrite dist/index.html, it's fine as long as hydration works.

            const filePath = path.join(dir, "index.html");
            fs.writeFileSync(filePath, html);
            console.log(`Saved: ${filePath}`);
        } catch (e) {
            console.error(`Failed to prerender ${route}:`, e);
        }
    }

    await browser.close();
    previewServer.httpServer.close();
    console.log("Prerendering complete.");
}

prerender();
