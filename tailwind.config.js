/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens:{
    '3xl': { 'max': '1750px' },
    '2xl': { 'max': '1600px' },
    'xl': { 'max': '1380px' },
    'lg': { 'max': '1170px' },
    'md': { 'max': '1050px' },
    'smd': { 'max': '800px' },
    'sm': { 'max': '456px' }
    },
    extend: {
      colors:{
        "primary":'#3F51B5'
      },
    }
  },
  plugins: [],
}
