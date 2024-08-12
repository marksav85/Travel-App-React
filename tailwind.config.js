/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "600px": "600px", // Custom height for card
        "400px": "400px", // Custom height for card
      },
    },
  },
  plugins: [],
};
