/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"PT Serif"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        craft: {
          bg: '#FAFAFA',          // Main background
          bgAlt: '#FDF2ED',       // Footer/Newsletter background
          dark: '#3A2318',        // Main heading text
          brown: '#6B5B53',       // Body text
          accent: '#8D5A3A',      // Buttons and highlights
          border: '#E8D8CD',      // Divider lines
        },
      },
    },
  },
  plugins: [],
}