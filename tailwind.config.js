/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#60A5FA', // Light Blue
        'primary-dark': '#3B82F6', // Darker Blue
        'secondary': '#90CDF4', // Lighter Blue
        'neutral-light': '#F9FAFB', // Light Gray
        'neutral': '#E5E7EB', // Medium Gray
        'neutral-dark': '#6B7280', // Dark Gray
        'success': '#34D399', // Green
        'warning': '#FBBF24', // Yellow
        'error': '#F87171',   // Red
      },
    },
  },
  plugins: [],
}
