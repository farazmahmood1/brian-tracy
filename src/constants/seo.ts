import routes from "./seoRoutes.json";

export const SITE_URL = "https://forrof.io";

export type SeoRoute = keyof typeof routes;

/**
 * Title, description and keywords for a static route.
 * seoRoutes.json is the single source of truth: the app reads it here, and
 * scripts/seo-postbuild.mjs reads it to write per-route HTML and the sitemap.
 */
export const seo = (path: SeoRoute) => {
  const route: { title: string; description: string; keywords: string; noindex?: boolean } = routes[path];
  return {
    title: route.title,
    description: route.description,
    keywords: route.keywords,
    url: canonicalFor(path),
    noindex: route.noindex ?? false,
  };
};

/** Canonical URL for a pathname: fixed origin, no query string, no trailing slash (except the homepage). */
export const canonicalFor = (pathname: string) => {
  const clean = pathname.replace(/\/+$/, "");
  return `${SITE_URL}${clean || "/"}`;
};
