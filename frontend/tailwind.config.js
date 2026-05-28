/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "azul-tardis": "#0B3D91",
        "space-dark": "#050816",
        "space-light": "#1E293B",
        "galaxy": "#7C3AED",
        "star": "#F8FAFC",
      },
    },
  },
  plugins: [],
}