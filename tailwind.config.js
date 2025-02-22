/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4F46E5", 
          DEFAULT: "#7B1FA2", //purple 
          dark: "#1E40AF", 
        },
        // secondary: {
        //   light: "#EC4899",
        //   DEFAULT: "#DB2777",
        //   dark: "#9D174D",
        // },
        // background: {
        //   light: "#F3F4F6",
        //   DEFAULT: "#E5E7EB",
        //   dark: "#111827",
        // },
        // text: {
        //   light: "#374151",
        //   DEFAULT: "#1F2937",
        //   dark: "#F9FAFB",
        // },
      },
    },
  },
  plugins: [],
};
