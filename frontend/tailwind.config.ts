// tailwind.config.js
/** @type {import('tailwindcss').Config} */

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./src/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        peach: "#FFDAB9",
        apricot: "#FFB07C",
        darkBrown: "#5D4037",
        darkApricot: "#E09E6D",
      },
      animation: {
        typewriter:
          "typewriter 2s steps(40) forwards, blink 0.75s step-end infinite",
      },
      keyframes: {
        typewriter: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { "border-color": "transparent" },
          "50%": { "border-color": "#5D4037" },
        },
      },
    },
  },
  plugins: [],
};
