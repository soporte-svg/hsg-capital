/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        '2xl': '1.25rem',
      },
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#0b1220',
        },
        capital: {
          primary: '#0A2540',
          accent: '#00875A',
          bgAlt: '#F4F6F8',
          text: '#1A2B3C',
          muted: '#6B7785',
          border: '#E1E5EA',
          warning: '#B86E00',
          error: '#C53030',
        },
      },
    },
  },
  plugins: [typography],
}

