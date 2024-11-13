/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "blue-100": "#EEEDFE",
        "blue-200": "#6C63FF",
        "blue-300": "#3C3699",
        "purple-100": "#9647FF",
        "purple-200": "#6A5CCE",
        "gray-100": "#D9D9D9",
        "gray-200": "#616161",
        "gray-300": "#333333",
        "orange-100": "#FF6F61",
        "green-100": "#32D296",
        "red-100": "#EF0F0F",
      },
    },
  },
  plugins: [],
};
