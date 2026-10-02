/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030407',
          900: '#05060A',
          850: '#090C14',
          800: '#0F1322',
          700: '#1A2035',
          600: '#2A3454',
          border: 'rgba(0, 240, 255, 0.12)',
        },
        cyan: {
          accent: '#00F0FF',
          glow: 'rgba(0, 240, 255, 0.3)',
          deep: '#0099B8',
        },
        lime: {
          accent: '#00FF99',
          glow: 'rgba(0, 255, 153, 0.3)',
        },
        amber: {
          solar: '#FFB800',
          glow: 'rgba(255, 184, 0, 0.3)',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'orbit-spin': 'orbit 25s linear infinite',
        'orbit-spin-reverse': 'orbit-reverse 35s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'orbit-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.4))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 20px rgba(0,240,255,0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(circle, rgba(0,240,255,0.07) 1px, transparent 1px)',
        'conic-accent': 'conic-gradient(from 0deg at 50% 50%, #00F0FF, #00FF99, #FFB800, #00F0FF)',
      }
    },
  },
  plugins: [],
};
