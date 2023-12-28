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
      colors: {
        //                                            Gray Theme
        "base-main" : "white",
        "main" : "black",

        "light-secondary-0": "rgb(249 250 251)",  //gray-50
        "light-secondary-1": "rgb(243 244 246)", //gray-100
        "light-secondary-2": "rgb(229 231 235)", //gray-200
        "light-secondary-3": "rgb(209 213 219)", //gray-300

        "dark-secondary-0": "rgb(3 7 18)", //gray-700
        "dark-secondary-1": "rgb(17 24 39)", //rgb(55 65 81)
        "dark-secondary-2": "rgb(31 41 55)",
        "dark-secondary-3": "rgb(55 65 81)",

        "text-secondary-9": "#0f172a", //slate-900
        "text-secondary-8": "#1e293b", //slate-800
        "text-secondary-7": "#334155", //slate-700
        "text-secondary-6": "#475569", //slate-600

        // Dark theme
        // "base-main" : "#272829",
        // "main" : "white",
        
        // "light-secondary-0": "black",  //gray-50
        // "light-secondary-1": "#", //gray-100
        // "light-secondary-2": "#", //gray-200
        // "light-secondary-3": "#", //gray-300

        // "dark-secondary-0": "#FFF6E0", //gray-700
        
        // "text-secondary-9": "#D8D9DA", //slate-50
        // "text-secondary-8": "#D8D9DA", //slate-800
        // "text-secondary-7": "#D8D9DA", //slate-700
        // "text-secondary-6": "#D8D9DA", //slate-600


        // Neon theme
        // "base-main" : "#001C30",
        // "main" : "white",
        
        // "light-secondary-0": "#001C30",  //gray-50
        // "light-secondary-1": "#", //gray-100
        // "light-secondary-2": "#", //gray-200
        // "light-secondary-3": "#", //gray-300

        // "dark-secondary-0": "#64CCC5", //gray-700
        
        // "text-secondary-9": "#DAFFFB", //slate-900
        // "text-secondary-8": "rgb(243 244 246)", //slate-800
        // "text-secondary-7": "rgb(229 231 235)", //slate-700
        // "text-secondary-6": "rgb(209 213 219)", //slate-600

        // "base-main": "black",
        // "main" : "white",
        
        // "secondary-9": "rgb(236 254 255)",
        // "secondary-8": "rgb(207 250 254)",
        // "secondary-7": "rgb(165 243 252)",
        // "secondary-6": "rgb(103 232 249)",
        // "secondary-5": "rgb(34 211 238)",
        // "secondary-4": "rgb(6 182 212)",
        // "secondary-3": "rgb(8 145 178)",
        // "secondary-2": "rgb(14 116 144)",
        // "secondary-1": "rgb(21 94 117)",
        // "secondary-0": "rgb(22 78 99)",
      }
    },
  },
  plugins: [],
}









