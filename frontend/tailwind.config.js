/**** Tailwind Config ****/ 
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d9ecff',
          200: '#b8dcff',
          300: '#89c7ff',
          400: '#4aa7ff',
          500: '#1d82ff',
          600: '#0564eb',
          700: '#004fbe',
          800: '#064497',
          900: '#0a387a'
        }
      }
    }
  },
  plugins: []
};
