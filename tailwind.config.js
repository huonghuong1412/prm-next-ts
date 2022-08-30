/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: {
    enabled: true,
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-red': "#c42726",
        'yellow': "#fbf4ed"
      },
      boxShadow: {
        '3xl': '0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075)',
        '4xl': '1px 2px 2px hsl(220deg 60% 50% / 0.333), 2px 4px 4px hsl(220deg 60% 50% / 0.333), 3px 6px 6px hsl(220deg 60% 50% / 0.333)',
      }
    },

  },
  variants: {
    extend: {
      backgroundColor: ["odd"],
    },
  },
  plugins: [],
}
