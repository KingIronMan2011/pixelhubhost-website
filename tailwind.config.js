/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
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
      fontFamily: {
        minecraft: ["Minecraft", "monospace"],
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
    },
  },
  plugins: [],
};
