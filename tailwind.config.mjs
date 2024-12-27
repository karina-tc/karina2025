/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'instrument-serif': ['Instrument Serif', 'serif'],
        'safiro': ['Safiro-Regular', 'sans-serif'],
      },
      colors: {
        'paper': {
          'base': '#FCFCFC',
          'green': '#EAF4EA'
        },
        'ink': {
          'primary': '#271E29',
          'secondary': '#878188',
          'highlight-orange': '#FF7945',
          'highlight-green': '#4A6E72'
        }
      },
      zIndex: {
        'navigation': '20',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'fade-in-up': 'fade-in-up 0.5s ease-in-out',
        'fade-in-down': 'fade-in-down 0.5s ease-in-out',
        'fade-in-left': 'fade-in-left 0.5s ease-in-out',
        'fade-in-right': 'fade-in-right 0.5s ease-in-out',
        'slow-fade-in': 'slow-fade-in 1.5s ease-in-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slow-fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 