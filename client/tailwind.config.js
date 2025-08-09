/** @type {import('tailwindcss').Config} */
module.exports = {
  // Add 'dark' mode strategy
  darkMode: 'class', // This is crucial!
  
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}