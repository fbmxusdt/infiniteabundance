/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      colors: {
        cream: '#FFF9F5',
        ink: '#1A2B1F',
        gold: {
          50: '#FEF7ED',
          100: '#FDE8D4',
          300: '#F5C99F',
          500: '#D4A574',
          600: '#C49560',
          700: '#9E7745',
        },
        teal: {
          50: '#EBFAF9',
          100: '#D0F3F1',
          300: '#6ECDD0',
          500: '#2B8A8A',
          600: '#1F6D6F',
          700: '#154D4F',
        },
        purple: {
          500: '#6B5B95',
          600: '#5A4A83',
        },
        green: {
          500: '#52A552',
          600: '#3F8A3F',
        },
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(6deg)' },
        },
        floatSlow: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-26px)' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        spinSlow: {
          'to': { transform: 'rotate(360deg)' },
        },
        shine: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' },
        },
        marquee: {
          'to': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'floatSlow 8s ease-in-out infinite',
        rise: 'rise .8s cubic-bezier(.2,.8,.2,1) both',
        spinSlow: 'spinSlow 40s linear infinite',
        shine: 'shine 5s ease-in-out infinite',
        marquee: 'marquee 26s linear infinite',
      },
    },
  },
  plugins: [],
}
