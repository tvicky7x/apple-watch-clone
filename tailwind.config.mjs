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
        customizeTabBg: "#E8E8ED",
      },
      keyframes: {
        showAnimationKeyFrame: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        showAnimation: "showAnimationKeyFrame .5s ease-in-out .3s forwards",
        showAnimation1d5s:
          "showAnimationKeyFrame .5s ease-in-out 1.5s forwards",
      },
    },
  },
  plugins: [],
};
