/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        craft: {
          cream: '#FFF8F0',
          tan: '#C08552',
          brown: '#8C5A3C',
          dark: '#4B2E2B',
          lightTan: '#e8d5c0',
        },
      },
    },
  },
  plugins: [],
}