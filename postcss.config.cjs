// This is the PostCSS configuration file for the project.
// PostCSS is a tool for transforming CSS with JavaScript plugins.

// Export the PostCSS config object
module.exports = {
  plugins: {
    tailwindcss: {}, // Enables Tailwind CSS for utility-first styling
    autoprefixer: {}, // Automatically adds vendor prefixes for better browser compatibility
  },
};

// This setup ensures that your CSS is processed with Tailwind's utilities
// and that necessary vendor prefixes are added for cross-browser support.
