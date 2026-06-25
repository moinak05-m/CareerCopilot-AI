/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#111827',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB', // Border
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280', // Secondary Text
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827', // Primary Text
          950: '#030712',
        },
        paper: {
          DEFAULT: '#F8FAFC', // Background
          50: '#FFFFFF',      // Card Background
          100: '#F8FAFC',
          200: '#F8FAFC',     // Body background
          300: '#E5E7EB',
          400: '#D1D5DB',
        },
        forest: { // Primary
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',     // Primary
          700: '#1D4ED8',     // Primary Hover
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        amber: { // Warning
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',     // Warning
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        coral: { // Error
          400: '#F87171',
          500: '#EF4444',     // Error
          600: '#DC2626',
        },
        accent: {
          DEFAULT: '#6366F1', // Accent
          500: '#6366F1',
        },
        success: {
          DEFAULT: '#22C55E', // Success
          500: '#22C55E',
        }
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        glow: '0 0 0 4px rgba(37, 99, 235, 0.1)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s infinite linear',
        floatY: 'floatY 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
