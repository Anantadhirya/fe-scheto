/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "420px",
      },
    },
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      black: "#000000",
      white: "#FFFFFF",
      transparent: "transparent",
      "blue-100": "#EEEDFE",
      "blue-200": "#6C63FF",
      "blue-300": "#3C3699",
      "purple-100": "#9647FF",
      "purple-200": "#6A5CCE",
      "gray-50": "#D9D9D9",
      "gray-100": "#F3F1F1",
      "gray-200": "#616161",
      "gray-300": "#333333",
      "orange-100": "#FF6F61",
      "green-100": "#32D296",
      "red-100": "#EF0F0F",
    },
  },
  plugins: [],
};
