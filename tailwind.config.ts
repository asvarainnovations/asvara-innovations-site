import type { Config } from "tailwindcss";
const path = require('path');

const config: Config = {
  content: [
    path.join(__dirname, "./pages/**/*.{js,ts,jsx,tsx,mdx}"),
    path.join(__dirname,"./components/**/*.{js,ts,jsx,tsx,mdx}"),
    path.join(__dirname, "./app/**/*.{js,ts,jsx,tsx,mdx}"),
    path.join(__dirname, './lib/**/*.{js,ts,jsx,tsx,mdx}'),
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1C3D5A",
        secondary: "#FFFFFF",
        accent: "#00A6FB",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
