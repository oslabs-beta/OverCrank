/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      short: { min: "0px", max: "499px" },
      tall: { min: "500px" },
    },
    extend: {},
  },
  plugins: [],
};
