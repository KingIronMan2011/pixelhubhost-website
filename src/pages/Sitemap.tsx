import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const sitemapLinks = [
  { path: "/", labelKey: "home" },
  { path: "/aboutus", labelKey: "aboutUsTitle" },
  { path: "/privacy", labelKey: "privacyPolicy" },
  { path: "/terms", labelKey: "termsOfService" },
  { path: "/legal", labelKey: "legal" },
  // Add more routes as needed
];

const Sitemap: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-lg mx-auto mt-24 mb-12 p-8 rounded-2xl shadow-xl bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800">
      <h1 className="font-extrabold text-3xl mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow">
        {t("texts.sitemap")}
      </h1>
      <ul className="space-y-3">
        {sitemapLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="block px-5 py-3 rounded-xl font-medium text-base text-blue-700 dark:text-blue-300 bg-blue-50/60 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-200 shadow-sm"
            >
              {t(`texts.${link.labelKey}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sitemap;
