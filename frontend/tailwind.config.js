/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Loyihangda ishlatilgan dark ranglar palitrasi
        dark: {
          500: '#2a2a35',
          600: '#22222a',
          700: '#1a1a22',
          800: '#121218',
          900: '#0a0a0f',
        },
        // Loyihangda ishlatilgan accent (urg'u) ranglari
        accent: {
          primary: '#6366f1',   // Indigo/Binafsha rang gradient uchun
          secondary: '#a855f7', // Siyohrang
          cyan: '#06b6d4',      // Havorang gradient uchun
          pink: '#ec4899',      // Pushti rang gradient uchun
        }
      },
    },
  },
  plugins: [],
}