/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    gridTemplateColumns: {
      '20': 'repeat(20, minmax(0, 1fr))',
     }
  },
  plugins: [
    function ({addUtilities}){
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar":{
          display: "none",
        },
        '.no-scrollbar':{
          '-ms-overflow-style':'none',
          'scrollbar-width': "none",
        }
      };
      addUtilities(newUtilities);
    }
  ],
  darkMode: 'class',
}