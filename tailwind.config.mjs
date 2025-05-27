/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: 'var(--color-dark)',
        light: 'var(--color-light)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          ...{
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
          },
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          ...{
            50: '#FAF5F0',
            100: '#F4ECE1',
            200: '#E8D6BF',
            300: '#DDC2A2',
            400: '#D2AF84',
            500: '#C69963',
            600: '#B78343',
            700: '#926835',
            800: '#6C4D28',
            900: '#4B351B',
            950: '#382814',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;