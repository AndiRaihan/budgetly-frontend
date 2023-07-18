/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["poppins", "sans-serif"],
      },
      colors: {
        background: {
          light : {
            100: '#F2FCF6',
            200: '#E6F9EE',
            300: '#D6F5E2',
            400: '#B8E7D1'
          }
        },
        primary: {
          100: '#A6BAAE',
          200: '#7BA88E',
          300: '#668573'
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
    },
  },
  plugins: [],
};
