import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { siteConfig } from "../config/site";

const sitemapLinks = [
  { path: "/", labelKey: "home" },
  { path: "/aboutus", labelKey: "aboutUsTitle" },
  { path: "/privacy", labelKey: "privacyPolicy" },
  { path: "/terms", labelKey: "termsOfService" },
  { path: "/legal", labelKey: "legal" },
  // Add more routes as needed
];

const Sitemap: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "3rem auto",
        padding: "2.5rem",
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 6px 32px rgba(0,0,0,0.06)",
      }}
    >
      <h1 style={{ fontWeight: 700, fontSize: "2rem", marginBottom: "2rem" }}>
        {siteConfig.texts.sitemap?.[language] ||
          siteConfig.texts.sitemap?.en ||
          "Sitemap"}
      </h1>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {sitemapLinks.map((link) => (
          <li key={link.path} style={{ margin: "1.2rem 0" }}>
            <Link
              to={link.path}
              style={{
                textDecoration: "none",
                color: "#3366ff",
                fontSize: "1.12rem",
                padding: "0.4rem 1.2rem",
                borderRadius: "10px",
                transition: "background 0.2s, color 0.2s",
                display: "inline-block",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#f0f4ff")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {siteConfig.texts[link.labelKey]?.[language] ||
                siteConfig.texts[link.labelKey]?.en ||
                link.labelKey}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sitemap;
