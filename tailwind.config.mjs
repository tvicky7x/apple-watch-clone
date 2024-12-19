/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "max-h-700": { raw: "(max-height: 700px)" },
      },
      colors: {
        primaryButtonColor: "#0071E3",
        primaryTextColor: "#1D1D1F",
        customizeTabBg: "#E8E8ED",
        collectionDivider: "#D2D2D7",
        collectionActiveColor: "#86868B",
        collectionHoverColor: "#06c",
      },
      keyframes: {
        showAnimationKeyFrame: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        openfilter: {
          "0%": { "max-width": "34px" },
          "95%": { "max-width": "500px" },
          "100%": { overflow: "visible" },
        },
      },
      animation: {
        showAnimation: "showAnimationKeyFrame .5s ease-in-out .3s forwards",
        showAnimation1d5s:
          "showAnimationKeyFrame .2s ease-in-out 1.5s forwards",
        openfilter: "openfilter 1.1s ease 1 forwards",
      },
    },
  },
  plugins: [],
};
