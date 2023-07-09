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
      primary: {
        100: '#AED4FF',
        200: '#5D98E9',
        300: '#1A62CC'
      },
      secondary: {
        100: '#E3D7FF',
        200: '#D1CEF8',
        300: '#BFB3F1'
      },
      accent: {
        100: '#FFC8C8',
        200: '#FF7B7B',
        300: '#FF2E2E'
      },
    },
    extend: {
      fontFamily: {
        poppins: ["poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
