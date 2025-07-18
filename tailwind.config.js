// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'soft-xl': '0 10px 25px rgba(0, 0, 0, 0.25)',
        'soft-md': '0 6px 15px rgba(0, 0, 0, 0.2)',
        'soft-sm': '0 2px 8px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
