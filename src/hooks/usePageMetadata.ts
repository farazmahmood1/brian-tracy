import { useEffect } from "react";
import { DEFAULT_METADATA } from "@/constants/metadata";
import { SITE_URL, canonicalFor } from "@/constants/seo";

interface PageMetadata {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    keywords?: string;
    /** Ask search engines not to index this page (404s, admin, thin pages) */
    noindex?: boolean;
}

const setMeta = (attr: "name" | "property", key: string, content: string) => {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
};

const setLink = (rel: string, href: string, hreflang?: string) => {
    const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
    let el = document.head.querySelector<HTMLLinkElement>(selector);
    if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        if (hreflang) el.setAttribute("hreflang", hreflang);
        document.head.appendChild(el);
    }
    el.setAttribute("href", href);
};

// The same English page serves both markets, so every regional hreflang points at the one URL.
export const HREFLANGS = ["en-AU", "en-NZ", "en", "x-default"];

export const usePageMetadata = ({ title, description, image, url, type, keywords, noindex }: PageMetadata) => {
    useEffect(() => {
        const pageTitle = title || DEFAULT_METADATA.title;
        const pageDescription = description || DEFAULT_METADATA.description;
        const pageImage = image || DEFAULT_METADATA.image;
        const canonical = url || canonicalFor(window.location.pathname);

        document.title = pageTitle;
        setMeta("name", "description", pageDescription);
        setMeta("name", "keywords", keywords || "");
        setMeta(
            "name",
            "robots",
            noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        );

        // Canonical + regional alternates - without these every route inherits the homepage canonical
        setLink("canonical", canonical);
        HREFLANGS.forEach((lang) => setLink("alternate", canonical, lang));

        setMeta("property", "og:title", pageTitle);
        setMeta("property", "og:description", pageDescription);
        setMeta("property", "og:image", pageImage);
        setMeta("property", "og:url", canonical);
        setMeta("property", "og:type", type || DEFAULT_METADATA.type);

        setMeta("name", "twitter:card", DEFAULT_METADATA.twitterCard);
        setMeta("name", "twitter:title", pageTitle);
        setMeta("name", "twitter:description", pageDescription);
        setMeta("name", "twitter:image", pageImage);

        return () => {
            // Restore defaults so a page without its own metadata never shows a stale title
            document.title = DEFAULT_METADATA.title;
            setMeta("name", "description", DEFAULT_METADATA.description);
            setMeta("name", "keywords", "");
            setLink("canonical", `${SITE_URL}/`);
            setMeta("property", "og:title", DEFAULT_METADATA.title);
            setMeta("property", "og:description", DEFAULT_METADATA.description);
            setMeta("property", "og:url", `${SITE_URL}/`);
            setMeta("name", "twitter:title", DEFAULT_METADATA.title);
            setMeta("name", "twitter:description", DEFAULT_METADATA.description);
        };
    }, [title, description, image, url, type, keywords, noindex]);
};
