/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        arch: {
          50: '#1C2B3E',
          100: '#243548',
          200: '#3C678E',
          300: '#5a85a8',
          400: '#6DADD8',
          500: '#2181BD',
          600: '#1a6a9e',
          700: '#c5e3f5',
          800: '#e3f2fb',
          900: '#f0f8fd',
          950: '#f8fcff',
        },
        cyan: {
          300: '#80CBF3',
          400: '#6DADD8',
          500: '#2181BD',
          600: '#1a6a9e',
          700: '#155a85',
        },
        blueprint: {
          line: 'rgba(33, 129, 189, 0.14)',
          accent: 'rgba(33, 129, 189, 0.28)',
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