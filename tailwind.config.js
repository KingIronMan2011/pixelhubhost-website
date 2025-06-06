/** @type {import('tailwindcss').Config} */

// This file configures Tailwind CSS for the project,
// specifying where Tailwind should look for class names (content),
// customizing colors, fonts, and enabling dark mode.
export default {
  // Tailwind will scan these files and folders for class names to generate styles.
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // Dark mode can be toggled by adding a “class” to the HTML root (e.g., <html class="dark">).
  darkMode: "class",

  theme: {
    extend: {
      // Custom color palette referencing Minecraft-themed colors.
      colors: {
        minecraft: {
          grass: "#22c55e",
          oak: "#854d0e",
          stone: "#78716c",
          iron: "#71717a",
          diamond: "#2563eb",
          netherite: "#44403c",
          dragon: "#581c87",
        },
      },
      // Custom font families, including a “Minecraft” font for stylistic headings.
      fontFamily: {
        minecraft: ["Minecraft", "monospace"],
      },
    },
  },
  // Any additional Tailwind plugins can be listed here.
  plugins: [],
};
