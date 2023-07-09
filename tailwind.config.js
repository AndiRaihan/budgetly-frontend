/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      background: {
        light : {
          100: '#F2FCF6',
          200: '#E6F9EE',
          300: '#D6F5E2'
        }
      },
      primary: '#5D98E9',
      secondary: '#D1CEF8',
      accent: '#291BC5',
    },
    extend: {
      fontFamily: {
        poppins: ["poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
