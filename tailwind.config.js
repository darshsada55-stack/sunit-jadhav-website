/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        royalblue: {
          50: '#eff4ff',
          100: '#dbe8fe',
          200: '#bfd4fd',
          300: '#93b4fb',
          400: '#608af7',
          500: '#3b63f3',
          600: '#2545e8',
          700: '#1d34d4',
          800: '#1e2cac',
          900: '#1e2e88',
          950: '#161d53',
        },
        gold: {
          300: '#fde68a',
          400: '#fbbf24',
          500: '#c9a227',
          600: '#a37a0d',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-oswald)', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #000000 0%, #0a0f2e 50%, #0d1e6e 100%)',
        'section-gradient': 'linear-gradient(180deg, #000000 0%, #050d2e 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(30,46,136,0.2) 0%, rgba(0,0,0,0.8) 100%)',
        'blue-glow': 'radial-gradient(ellipse at center, rgba(30,58,138,0.4) 0%, transparent 70%)',
      },
      boxShadow: {
        'blue-glow': '0 0 40px rgba(30,58,138,0.5)',
        'gold-glow': '0 0 20px rgba(201,162,39,0.4)',
        'card': '0 4px 30px rgba(0,0,0,0.5)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
