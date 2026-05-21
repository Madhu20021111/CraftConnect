/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFF8F0",
        primary: "#C08552",
        secondary: "#8C5A3C",
        dark: "#4B2E2B",
      },
    },
  },
  plugins: [],
};
