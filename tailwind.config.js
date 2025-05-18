/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./*.js",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#2980b9',
        'primary-dark': '#1c638f',
        'secondary-color': '#333333',
        'accent-color': '#3498db',
        'light-bg': '#f8f9fa',
        'dark-bg': '#343a40',
        'text-color': '#333333',
        'text-light': '#6c757d',
      },
      maxWidth: {
        'container-width': '1200px',
        '95p': '95%',
      },
    },
  },
  plugins: [],
}
