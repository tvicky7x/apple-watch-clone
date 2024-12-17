/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryButtonColor: "#0071E3",
      },
      keyframes: {
        showAnimationKeyFrame: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        showAnimation: "showAnimationKeyFrame .5s ease-in-out .3s forwards",
      },
    },
  },
  plugins: [],
};
