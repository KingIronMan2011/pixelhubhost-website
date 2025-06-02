import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../config/site';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

const MetaTags = ({
  title,
  description,
  image = 'https://www.pixelhubhost.com/og-image.png',
  type = 'website'
}: MetaTagsProps) => {
  const { language } = useLanguage();
  const location = useLocation();
  const currentUrl = `https://www.pixelhubhost.com${location.pathname}`;
  const pageTitle = title || siteConfig.name;
  const pageDescription = description || siteConfig.description[language];

  // Supported languages for alternate links
  const languages = ['en', 'pt', 'de', 'fr'];

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.name} />
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
          href={`${currentUrl}?lang=${code}`}
          hrefLang={code}
        />
      ))}
    </Helmet>
  );
};

export default MetaTags;