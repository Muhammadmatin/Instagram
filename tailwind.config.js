/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
    },
    screens: {
      'sm': '425px',
      'md': '768px',
      'lg': '1024px',
      'lg2': '1160px',
      'lg3': '1265px'
    },
  },
  plugins: [],
}
