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
        "min-h-950": { raw: "(min-height:950px)" },
        "min-h-1100": { raw: "(min-height:1100px)" },
        "min-w-768-max-w-1024": {
          raw: "(min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape)",
        },
        "min-w-768-max-w-1024-noLandscape": {
          raw: "(min-device-width: 768px) and (max-device-width: 1024px)",
        },
        "max-h-770": { raw: "(max-height:770px)" },
        "max-w-1023-max-w-736": {
          raw: "(max-width:1023px) and (max-width:736px)",
        },
      },
      colors: {
        primaryButtonColor: "#0071E3",
        primaryTextColor: "#1D1D1F",
        customizeTabBg: "#E8E8ED",
        collectionDivider: "#D2D2D7",
        collectionActiveColor: "#86868B",
        collectionHoverColor: "#06c",
        collectionTextColor: "#6E6E73",
      },
      spacing: {
        "calc-2vh-8px": "calc(2vh + 8px)",
        "calc--26vh-156px": "calc(-26vh + 156px)",
        "calc--23vh-156px": "calc(-23vh + 156px)",
        "calc--42.5vh-156px": "calc(-42.5vh + 156px)",
        "calc-50vw-156px": "calc(50vw - 156px)",
        "calc-50p-20px": "calc(50% - 20px)",
      },
      keyframes: {
        showAnimationKeyFrame: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        hideAnimationKeyFrame: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        openfilter: {
          "0%": { "max-width": "34px" },
          "95%": { "max-width": "500px" },
          "100%": { overflow: "visible" },
        },
      },
      animation: {
        showAnimation: "showAnimationKeyFrame .5s ease-in-out .3s forwards",
        hideAnimation: "hideAnimationKeyFrame .5s ease-in-out .3s forwards",
        showAnimation1d8s:
          "showAnimationKeyFrame .2s ease-in-out 1.8s forwards",
        openfilter: "openfilter 1.1s ease 1 forwards",
        spinShowAnimation: "showAnimationKeyFrame .5s ease forwards",
        spinHideAnimation: "hideAnimationKeyFrame .5s ease forwards",
      },
    },
  },
  plugins: [],
};
