/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'new-rocker': ['New Rocker', 'system-ui'],
        'bahiana-regular': ['Bahiana', 'system-ui'],
        'truculenta': ['Truculenta', 'system-ui'],
      },
    },
  },
  plugins: [],
};
