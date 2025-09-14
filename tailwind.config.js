/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
          dark: '#1e40af',
          light: '#3b82f6',
        },
        accent: {
          DEFAULT: '#f59e42', // orange-400
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        error: '#dc2626', // red-600
        success: '#16a34a', // green-600
        info: '#2563eb',
        warning: '#facc15', // yellow-400
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
