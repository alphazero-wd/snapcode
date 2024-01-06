/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",
    "./static/src/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Source Sans 3'", "sans-serif"],
        mono: [
          "'Fira Code'",
          "'Fira Mono'",
          "Menlo",
          "Consolas",
          "DejaVu Sans Mono",
          "monospace",
        ],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
