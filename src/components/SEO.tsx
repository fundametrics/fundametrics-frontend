import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterHandle?: string;
    children?: React.ReactNode;
}

const SEO: FC<SEOProps> = ({
    title = "Fundametrics | Financial data & insights. No noise.",
    description = "Institutional-grade financial terminal for retail investors. Analyze stocks with deep P&L, Balance Sheets, and Cash Flow trends. No noise, just clean data.",
    canonical = "https://fundametrics.in",
    ogTitle,
    ogDescription,
    ogImage = "https://fundametrics.in/Finox.jpeg",
    twitterHandle = "@fundametrics",
    children
}) => {
    const fullTitle = title.includes("Fundametrics") ? title : `${title} | Fundametrics`;

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonical} />
            <meta property="og:title" content={ogTitle || fullTitle} />
            <meta property="og:description" content={ogDescription || description} />
            <meta property="og:image" content={ogImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={twitterHandle} />
            <meta name="twitter:title" content={ogTitle || fullTitle} />
            <meta name="twitter:description" content={ogDescription || description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Search Engine Directives */}
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />

            {/* Custom child tags */}
            {children}
        </Helmet>
    );
};

export default SEO;
