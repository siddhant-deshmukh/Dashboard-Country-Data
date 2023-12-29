/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "laptop" : "1500px",
        "desktop": "1750px"
      },
    },
  },
  plugins: [],
}