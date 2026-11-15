/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        skycred: {
          bg: '#060607',
          'bg-elev': '#0d0d10',
          card: '#111114',
          'card-border': 'rgba(255, 255, 255, 0.08)',
          gold: '#f3c969',
          'gold-light': '#ffe9b8',
          purple: '#8b5cf6',
          pink: '#ec4899',
          text: '#f5f5f7',
          'text-dim': '#9a9aa3',
          'text-faint': '#5c5c66',
          green: '#34d399',
          red: '#f87171',
        },
      },
    },
  },
  plugins: [],
};
