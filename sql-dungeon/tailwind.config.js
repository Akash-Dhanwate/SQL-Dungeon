/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0d0f14',
        'obsidian-light': '#161923',
        'obsidian-mid': '#1e2433',
        emerald: {
          DEFAULT: '#10b981',
          dim: '#0d9668',
          glow: '#34d399',
        },
        crimson: {
          DEFAULT: '#ef4444',
          dim: '#dc2626',
        },
        amber: {
          DEFAULT: '#f59e0b',
          dim: '#d97706',
        },
        slate: {
          terminal: '#94a3b8',
          dim: '#475569',
        },
      },
      fontFamily: {
        mono: ['"Share Tech Mono"', '"Courier New"', 'monospace'],
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      boxShadow: {
        'emerald-glow': '0 0 20px rgba(16, 185, 129, 0.4)',
        'crimson-glow': '0 0 20px rgba(239, 68, 68, 0.4)',
        'amber-glow': '0 0 15px rgba(245, 158, 11, 0.3)',
        'crt': 'inset 0 0 60px rgba(0,0,0,0.5)',
      },
      animation: {
        'flicker': 'flicker 0.15s infinite',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'shake': 'shake 0.3s ease-in-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.95' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-4px)' },
          '40%': { transform: 'translateX(4px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(2px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(16, 185, 129, 0.7)' },
        },
      },
    },
  },
  plugins: [],
}
