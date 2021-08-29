module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './lib/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Helvetica Neue', 'sans-serif'],
    },
    textColor: theme => ({
      ...theme('colors'),
      'primary': '#006C9D',
      'secondary': '#5A6A72',
      'danger': '#e3342f',
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#023C52',
      'primary-hover': '#065877',
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
