import React from "react";
import { Link } from "react-router-dom";

const sitemapLinks = [
  { path: "/", label: "Home" },
  // Add more routes as needed
];

const Sitemap: React.FC = () => {
  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", padding: "2rem" }}>
      <h1>Sitemap</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {sitemapLinks.map((link) => (
          <li key={link.path} style={{ margin: "1rem 0" }}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sitemap;
