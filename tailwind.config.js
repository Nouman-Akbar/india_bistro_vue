/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#111111',
        primary: '#E53E3E',
        accent: '#D69E2E',
        text: '#F7FAFC',
        'text-muted': '#A0AEC0',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        'pp-mori': ['"PPMori"', 'sans-serif'],
        'pitch': ['"Pitch"', 'sans-serif'],
        'sweet-sans': ['"SweetSansPro"', 'sans-serif'],
        'founders': ['"FoundersGrotesk"', 'sans-serif'],
        'britain': ['"F37Britain"', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
