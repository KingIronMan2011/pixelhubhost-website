import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { config } from "../config/config";
import languagesConfig from "../config/languages/Languages";

type SupportedLanguage = keyof typeof languagesConfig;

type MetaTagsProps = {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  language?: string;
};

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  image = "/images/og-image.jpg",
  type = "website",
  language = "en",
}) => {
  const pageTitle = useMemo(() => {
    return title ? `${title} | ${config.name}` : config.name;
  }, [title]);

  const pageDescription = useMemo(() => {
    if (description) return description;
    const langDesc =
      languagesConfig?.[language as SupportedLanguage]?.description ||
      languagesConfig?.en?.description;
    if (langDesc) return langDesc;
    if (typeof document !== "undefined") {
      const meta = document.querySelector('meta[name="description"]');
      if (meta && meta.getAttribute("content")) {
        return meta.getAttribute("content") as string;
      }
    }
    return "";
  }, [description, language]);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const languages = ["en", "pt", "de", "fr"];

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={config.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={currentUrl} />
      <link rel="alternate" href={currentUrl} hrefLang="x-default" />
      {languages.map((code) => (
        <link
          key={code}
          rel="alternate"
          href={`https://www.pixelhubhost.com${location.pathname}?lang=${code}`}
          hrefLang={code}
        />
      ))}
      <html lang={language} />
    </Helmet>
  );
};

export default MetaTags;
