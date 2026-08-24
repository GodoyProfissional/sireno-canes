/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#0c4a6e',
        },
        danger: { 500: '#ef4444', 600: '#dc2626' },
        success: { 500: '#22c55e', 600: '#16a34a' },
        warning: { 500: '#f59e0b', 600: '#d97706' },
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      animation: {
        'bounce-slight': 'bounceSlight 1s infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        shake: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'blur-in': 'blurIn 0.6s ease-out forwards',
        'pulse-warning': 'pulseWarning 1.5s ease-in-out infinite',
      },
      keyframes: {
        bounceSlight: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'none' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-2px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(4px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-8px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(8px, 0, 0)' },
        },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        blurIn: {
          '0%': {
            filter: 'blur(10px)',
            opacity: '0',
            transform: 'scale(1.05)',
          },
          '100%': { filter: 'blur(0)', opacity: '1', transform: 'scale(1)' },
        },
        pulseWarning: {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(245, 158, 11, 0.4)',
            borderColor: '#f59e0b',
          },
          '50%': {
            boxShadow: '0 0 0 8px rgba(245, 158, 11, 0)',
            borderColor: '#fbbf24',
          },
        },
      },
    },
  },
  plugins: [],
}
