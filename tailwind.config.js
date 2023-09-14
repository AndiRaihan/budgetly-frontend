/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        'max-height': 'max-height'
      },
      fontFamily: {
        poppins: ["poppins", "sans-serif"],
      },
      colors: {
        'dark-green':"#005037",
        light : {
          100: '#F2FCF6',
          200: '#E6F9EE',
          300: '#D6F5E2',
          400: '#B8E7D1'
        },
        dark: {
          100 : '#D9D9D9', 
          200 : '#A5C9CA',
          300 : '#395B64',
          350 : '#416772',
          400 : '#2C3333'
        },
        background: {
          light : {
            100: '#F2FCF6',
            200: '#E6F9EE',
            300: '#D6F5E2',
            400: '#B8E7D1'
          },
          dark: {
            100 : '#D9D9D9', 
            200 : '#A5C9CA',
            300 : '#395B64',
            350 : '#416772',
            400 : '#2C3333'
          }
        },
        primary: {
          100: '#CEEFDB',
          200: '#9CCCAF',
          300: '#7BA88D'
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
  variants: {
    extend: {
      filter: ['responsive', 'hover', 'focus'],
      brightness: ['responsive', 'hover', 'focus'],
    }
  },
  plugins: [],
};
