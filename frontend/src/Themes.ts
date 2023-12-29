import { TColorThemeOptions } from "./types"

const variables = [
  "base-main",
  "main",
  "main-1",
  "main-2",
  "main-3",
  "main-4",
  "light-secondary-0",
  "light-secondary-1",
  "light-secondary-2",
  "light-secondary-3",
  "dark-secondary-0",
  "dark-secondary-1",
  "dark-secondary-2",
  "dark-secondary-3"
]

export const color_themes: {
  [key in TColorThemeOptions]: {
    [k: string]: string
  }
} = {
  //                                            Gray Theme
  "grey": {
    "base-main": "white",
    "main": "black",
    "main-1": "rgb(3 7 18  )", //gray-950
    "main-2": "rgb(17 24 39)", //gray-900
    "main-3": "rgb(31 41 55)", //gray-800
    "main-4": "rgb(55 65 81)", //gray-700

    "light-secondary-0": "rgb(249 250 251)",  //gray-50
    "light-secondary-1": "rgb(243 244 246)", //gray-100
    "light-secondary-2": "rgb(229 231 235)", //gray-200
    "light-secondary-3": "rgb(209 213 219)", //gray-300

    "dark-secondary-0": "rgb(3 7 18  )",    //gray-950  
    "dark-secondary-1": "rgb(17 24 39)",    //gray-900  
    "dark-secondary-2": "rgb(31 41 55)",    //gray-800
    "dark-secondary-3": "rgb(55 65 81)",    //gray-700
  },

  // -----------------------                    Dark theme                    --------------------------------------
  "dark-blue": {
    "base-main": "rgb(3 7 18)",

    "main": "white",
    "main-1": "rgb(249 250 251)",   //gray-50
    "main-2": "rgb(243 244 246)",   //gray-100
    "main-3": "rgb(229 231 235)",   //gray-200
    "main-4": "rgb(209 213 219)",   //gray-300

    "light-secondary-0": "rgb(3 7 18  )", //gray-950
    "light-secondary-1": "rgb(17 24 39)", //gray-900
    "light-secondary-2": "rgb(31 41 55)", //gray-800
    "light-secondary-3": "rgb(55 65 81)", //gray-700

    "dark-secondary-0": "#dbeafe", //blue-100
    "dark-secondary-1": "#bfdbfe", //blue-200
    "dark-secondary-2": "#93c5fd", //blue-300
    "dark-secondary-3": "#60a5fa", //blue-400

  },
  //                                            Blue Light Theme
  "light-blue": {
    "base-main": "white",
    "main": "black",
    "main-1": "rgb(3 7 18  )",
    "main-2": "rgb(17 24 39)",
    "main-3": "rgb(31 41 55)",
    "main-4": "rgb(55 65 81)",

    "light-secondary-0": "#eff6ff",
    "light-secondary-1": "#dbeafe",
    "light-secondary-2": "#bfdbfe",
    "light-secondary-3": "#93c5fd",

    "dark-secondary-0": "#0369a1",
    "dark-secondary-1": "#075985",
    "dark-secondary-2": "#0c4a6e",
    "dark-secondary-3": "#082f49",
  }

}

export function SwitchTheme(color_theme: TColorThemeOptions, document: Document) {
  // variables.forEach((css_variable) => {
  //   document.documentElement.style.setProperty("--" + css_variable, color_themes[color_theme][css_variable])
  // })
  document.body.setAttribute("color-theme", color_theme)
}


/**
"base-main": "rgb(3 7 18)",
"main": "white",
"main-1": "rgb(249 250 251)",  
"main-2": "rgb(243 244 246)",  
"main-3": "rgb(229 231 235)",  
"main-4": "rgb(209 213 219)",  

"light-secondary-0": "rgb(3 7 18  )",
"light-secondary-1": "rgb(17 24 39)",
"light-secondary-2": "rgb(31 41 55)",
"light-secondary-3": "rgb(55 65 81)",

"dark-secondary-0": "#dbeafe",
"dark-secondary-1": "#bfdbfe",
"dark-secondary-2": "#93c5fd",
"dark-secondary-3": "#60a5fa",
 */