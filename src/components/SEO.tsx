import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

export const SEO = ({
  title = "Forrof | Custom Software, Web, Mobile App & Digital Solutions Agency",
  description = "Forrof is a full service software agency delivering branding, web development, mobile apps, UI UX, SEO, cloud solutions, SaaS, cybersecurity, automation, and digital transformation for growing businesses.",
  keywords = "forrof, software agency, web development, mobile app development, UI UX design, branding, SEO services, SaaS development, cloud solutions, cybersecurity, automation, digital transformation",
  image = "https://forrof.io/logo.png",
  url = "https://forrof.io/",
  type = "website",
  article,
}: SEOProps) => {
  const fullTitle = title.includes("Forrof") ? title : `${title} | Forrof`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (selector: string, attribute: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        const attrName = attribute.split("=")[0];
        const attrValue = attribute.split("=")[1].replace(/["']/g, "");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Update or create link tags (canonical)
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement("link");
        element.rel = rel;
        document.head.appendChild(element);
      }
      element.href = href;
    };

    // Primary Meta Tags
    updateMetaTag('meta[name="description"]', 'name="description"', description);
    updateMetaTag('meta[name="keywords"]', 'name="keywords"', keywords);
    updateLinkTag("canonical", url);

    // Open Graph / Facebook
    updateMetaTag('meta[property="og:type"]', 'property="og:type"', type);
    updateMetaTag('meta[property="og:url"]', 'property="og:url"', url);
    updateMetaTag('meta[property="og:title"]', 'property="og:title"', fullTitle);
    updateMetaTag('meta[property="og:description"]', 'property="og:description"', description);
    updateMetaTag('meta[property="og:image"]', 'property="og:image"', image);

    // Twitter
    updateMetaTag('meta[name="twitter:title"]', 'name="twitter:title"', fullTitle);
    updateMetaTag('meta[name="twitter:description"]', 'name="twitter:description"', description);
    updateMetaTag('meta[name="twitter:image"]', 'name="twitter:image"', image);

    // Article specific tags
    if (article && type === "article") {
      if (article.publishedTime) {
        updateMetaTag('meta[property="article:published_time"]', 'property="article:published_time"', article.publishedTime);
      }
      if (article.modifiedTime) {
        updateMetaTag('meta[property="article:modified_time"]', 'property="article:modified_time"', article.modifiedTime);
      }
      if (article.author) {
        updateMetaTag('meta[property="article:author"]', 'property="article:author"', article.author);
      }
      if (article.section) {
        updateMetaTag('meta[property="article:section"]', 'property="article:section"', article.section);
      }
    }
  }, [fullTitle, description, keywords, image, url, type, article]);

  return null;
};
