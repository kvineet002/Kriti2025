module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  plugins: [
    function ({ addUtilities}) {
 

      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".no-tap": {
          "-webkit-tap-highlight-color": "transparent",
        }
      };

      addUtilities(newUtilities);
    },
  ],
  darkMode: "class",
};
