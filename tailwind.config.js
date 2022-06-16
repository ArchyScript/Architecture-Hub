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
      gridTemplateColumns: {
        // Simple 16 column grid
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
    },
    container: {
      center: true,
      padding: '1rem 0',
      screens: {
        lg: '1124px',
        xl: '1200px',
        '2xl': '1560px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
