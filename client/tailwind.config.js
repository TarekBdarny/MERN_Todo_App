/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#222831",
        secondary: "#393E46",
        highlight: "#00ADB5",
        "text-color": "#EEEEEE",
      },
      classes: {
        link: "text-text-color hover:bg-highlight p-3 rounded-md transition-all duration-300",
      },
    },
  },
  plugins: [daisyui],
};
