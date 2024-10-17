/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "dark-green": "#1B424C",
        "brigth-green": "#39C260",
        gray: "#424545",
        white: "#FFFFFF",
        "smoke-gray": "#6F6969",
      },
      fontFamily: {
        body: ["Raleway", "sans-serif"],
        DMSans: ["DM Sans", "sans-serif"],
      },
      boxShadow: {
        "inner-2": "0px 0px 0px 2px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
