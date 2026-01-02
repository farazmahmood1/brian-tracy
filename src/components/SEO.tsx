import { Helmet } from "react-helmet-async";
import { DEFAULT_METADATA } from "@/constants/metadata";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
}

export const SEO = ({
    title,
    description,
    image,
    url,
    type,
}: SEOProps) => {
    const metaTitle = title || DEFAULT_METADATA.title;
    const metaDescription = description || DEFAULT_METADATA.description;
    const metaImage = image || DEFAULT_METADATA.image;
    const metaUrl = url || window.location.href;
    const metaType = type || DEFAULT_METADATA.type;

    return (
        <Helmet>
            {/* Primary SEO */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />

            {/* Open Graph */}
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:type" content={metaType} />

            {/* Twitter */}
            <meta name="twitter:card" content={DEFAULT_METADATA.twitterCard} />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
        </Helmet>
    );
};
