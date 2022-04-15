module.exports = {
  purge: ['./src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'archyhub-light': '#FDF8F4',
        'archyhub-main': '#ff6501',
        'archyhub-semi-light': '#FAE6D6',
        'archyhub-dark-dark': '#0C1D37',
        'archyhub-gray': '#D4D2D4',
      },
      animation: { 'spin-slow': 'spin 10s linear infinite' },
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        lg: '1124px',
        xl: '1124px',
        '2xl': '1124px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
