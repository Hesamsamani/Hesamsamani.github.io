/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          50: '#f5f3f0',
          100: '#e8e4de',
          200: '#d4cdc3',
          300: '#b8aea0',
          400: '#9a8d7c',
          500: '#7d6f5e',
          600: '#635849',
          700: '#4a4238',
          800: '#2e2a24',
          900: '#1c1a17',
          950: '#121110',
        },
        copper: {
          300: '#e8b87a',
          400: '#d4954a',
          500: '#b87333',
          600: '#9a5f28',
          700: '#7a4c20',
        },
        blueprint: {
          line: 'rgba(184, 115, 51, 0.12)',
          accent: 'rgba(184, 115, 51, 0.25)',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'reveal-up': 'revealUp 0.7s ease-out forwards',
        'reveal-fade': 'revealFade 0.6s ease-out forwards',
      },
      keyframes: {
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        revealFade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};