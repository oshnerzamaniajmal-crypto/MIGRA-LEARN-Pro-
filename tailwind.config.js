/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18312e",
        forest: "#173f3a",
        sage: "#6f9182",
        sand: "#eee5d2",
        amber: "#d99a45",
        coral: "#d8745f",
        cloud: "#f6f4ee"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(24, 49, 46, 0.10)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Georgia", "ui-serif", "serif"]
      }
    }
  },
  plugins: []
};
