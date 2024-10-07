/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        gray: {
          900: '#181818', // background
          800: '#2A2A2A', // card background
          400: '#B0B0B0', // muted text
        },
        white: '#FFFFFF', // text
      },
      // Adding the animations and keyframes
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out',  // Defining fade-in animation
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
