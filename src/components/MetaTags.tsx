import { useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Helmet } from "react-helmet-async";
import { config } from "../config/config";

// Props for MetaTags component: can override title, description, image, and type
interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

// MetaTags component: sets SEO and social meta tags for the current page
const MetaTags = ({
  title,
  description,
  image = "https://www.pixelhubhost.com/og-image.png",
  type = "website",
}: MetaTagsProps) => {
  // Get current language from context
  const { language } = useLanguage();
  // Get current location (URL path) from React Router
  const location = useLocation();
  // Build the full canonical URL for the current page
  const currentUrl = `https://www.pixelhubhost.com${location.pathname}`;
  // Use provided title/description or fallback to config.name
  const pageTitle = title || config.name;
  const pageDescription = description || config.name;

  // Supported languages for alternate hreflang links
  const languages = ["en", "pt", "de", "fr"];

  return (
    <Helmet>
      {/* Standard meta tags for SEO */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      {/* Open Graph meta tags for social sharing */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={config.name} />

      {/* Twitter card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />

      {/* Robots and viewport meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Canonical link for SEO */}
      <link rel="canonical" href={currentUrl} />

      {/* Alternate language links for SEO and internationalization */}
      <link rel="alternate" href={currentUrl} hrefLang="x-default" />
      {languages.map((code) => (
        <link
          key={code}
          rel="alternate"
          href={`https://www.pixelhubhost.com${location.pathname}?lang=${code}`}
          hrefLang={code}
        />
      ))}

      {/* Set the <html lang="..."> attribute for accessibility/SEO */}
      <html lang={language} />
    </Helmet>
  );
};

export default MetaTags;
