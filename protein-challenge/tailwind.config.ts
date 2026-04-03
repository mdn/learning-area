import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#07b0a4',
          light: '#0ecfc1',
          dark: '#058f85',
          50: '#f0fdfb',
          100: '#ccfaf6',
          200: '#99f4ed',
          300: '#5de8de',
          400: '#28d1c8',
          500: '#07b0a4',
          600: '#058f85',
          700: '#07726b',
          800: '#0a5c57',
          900: '#0d4c48',
        },
        lime: {
          DEFAULT: '#C8F53A',
          dark: '#a8d420',
        },
        pink: {
          soft: '#FFB3C6',
          DEFAULT: '#FF6B9D',
          dark: '#e85588',
        },
        brand: {
          black: '#0A0A0A',
          white: '#FAFAFA',
        }
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        dm: ['var(--font-dm-sans)', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backgroundImage: {
        'teal-gradient': 'linear-gradient(135deg, #07b0a4 0%, #0ecfc1 100%)',
        'hero-gradient': 'linear-gradient(135deg, #07b0a4 0%, #058f85 50%, #0a5c57 100%)',
        'card-gradient': 'linear-gradient(145deg, #ffffff 0%, #f0fdfb 100%)',
        'lime-gradient': 'linear-gradient(135deg, #C8F53A 0%, #a8d420 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.4s ease-out',
        'bounce-in': 'bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'xp-fill': 'xp-fill 1s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.03)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-in': {
          from: { opacity: '0', transform: 'scale(0.5)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'xp-fill': {
          from: { width: '0%' },
          to: { width: 'var(--xp-width)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'teal': '0 4px 24px rgba(7, 176, 164, 0.25)',
        'teal-lg': '0 8px 40px rgba(7, 176, 164, 0.35)',
        'lime': '0 4px 20px rgba(200, 245, 58, 0.3)',
        'card': '0 2px 16px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
export default config
