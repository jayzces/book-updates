module.exports = {
  theme: {
    extend: {
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 17',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
        'span-20': 'span 20 / span 20',
      },
    },
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
    },
    fontFamily: {
      sans: [
        'Open Sans',
        'Helvetica Neue',
        'sans-serif',
      ],
    },
    spacing: {
      0: '0',
      5: '5px',
      10: '10px',
      15: '15px',
      20: '20px',
      25: '25px',
      30: '30px',
      35: '35px',
      40: '40px',
      50: '50px',
      60: '60px',
      70: '70px',
      80: '80px',
      90: '90px',
      100: '100px',
    },
    gridTemplateColumns: {
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      20: 'repeat(20, minmax(0, 1fr))',
    },
    screens: {
      '3xl': { max: '1919px' },
      '2xl': { max: '1549px' },
      xl: { max: '1349px' },
      lg: { max: '1199px' },
      md: { max: '991px' },
      sm: { max: '767px' },
      xs: { max: '599px' },
      '2xs': { max: '450px' },
    },
  },
  variants: {},
  plugins: [],
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `plugins/**/*.{js,ts}`,
    `nuxt.config.{js,ts}`,
  ],
}
