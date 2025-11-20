// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: "#4338CA", // main accent
          violet: "#6366F1", // lighter transition
          light: "#A5B4FC",  // soft highlight
          background: "#F8FAFC", // default background
        },
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, rgba(67,56,202,0.9) 0%, rgba(99,102,241,0.85) 50%, rgba(165,180,252,0.9) 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(165,180,252,0.15) 100%)",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};