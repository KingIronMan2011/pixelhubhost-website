// Import ESLint base configs and plugins for JS, React, and TypeScript
import js from "@eslint/js"; // ESLint's recommended JS config
import globals from "globals"; // Common global variables (browser, node, etc.)
import reactHooks from "eslint-plugin-react-hooks"; // React hooks linting rules
import reactRefresh from "eslint-plugin-react-refresh"; // React Fast Refresh linting
import tseslint from "typescript-eslint"; // TypeScript ESLint integration

// Export the ESLint configuration using typescript-eslint's config helper
export default tseslint.config(
  { ignores: ["dist"] }, // Ignore the "dist" folder from linting
  {
    extends: [
      js.configs.recommended, // Use ESLint's recommended JS rules
      ...tseslint.configs.recommended, // Use recommended TypeScript rules
    ],
    files: ["**/*.{ts,tsx}"], // Apply these rules to all TS/TSX files
    languageOptions: {
      ecmaVersion: 2020, // Use ECMAScript 2020 syntax
      globals: globals.browser, // Use browser global variables (window, document, etc.)
    },
    plugins: {
      "react-hooks": reactHooks, // Enable React hooks linting
      "react-refresh": reactRefresh, // Enable React Fast Refresh linting
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Enforce React hooks best practices
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ], // Warn if components are not exported correctly for Fast Refresh
    },
  }
);

// This config ensures code quality and best practices for a React + TypeScript project,
// including hooks rules, Fast Refresh compatibility, and modern JS/TS support.
