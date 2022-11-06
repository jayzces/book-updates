module.exports = {
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        current: 'currentColor',
        transparent: 'transparent',
      },
    },
    fontFamily: {
      sans: [
        'Poppins',
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
  },
  variants: {},
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `plugins/**/*.{js,ts}`,
    `nuxt.config.{js,ts}`,
  ],
}
