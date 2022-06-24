// eslint-disable-next-line import/no-extraneous-dependencies
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}', 'swiper/'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: '415px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundSize: {
        '50%': '50%',
        16: '4rem',
      },
      backgroundImage: () => ({
        'cbnt-ptrn':
          "url('https://res.cloudinary.com/edwindanlopez/image/upload/v1634746200/BBS/Website-Assets/category-texture-tiles/cabinets-tile-texture_m3kaes.jpg')",
        'closet-ptrn':
          "url('https://res.cloudinary.com/edwindanlopez/image/upload/v1634746200/BBS/Website-Assets/category-texture-tiles/closets-tile-texture_blcsap.jpg')",
        'custom-ptrn':
          "url('https://res.cloudinary.com/edwindanlopez/image/upload/v1634746200/BBS/Website-Assets/category-texture-tiles/custom-tile-texture_sewcyh.jpg')",
        'floor-ptrn':
          "url('https://res.cloudinary.com/edwindanlopez/image/upload/v1634746200/BBS/Website-Assets/category-texture-tiles/floor-tile-texture_ux1q8w.jpg')",
        'illus-ptrn':
          "url('https://res.cloudinary.com/edwindanlopez/image/upload/v1634746200/BBS/Website-Assets/category-texture-tiles/illustrations-tile-texture_wc9sxo.jpg')",
        'mural-ptrn':
          "url('https://res.cloudinary.com/edwindanlopez/image/upload/v1634746201/BBS/Website-Assets/category-texture-tiles/mural-tile-texture_pyjdis.jpg')",
        'shower-ptrn':
          "url('https://res.cloudinary.com/edwindanlopez/image/upload/v1634746200/BBS/Website-Assets/category-texture-tiles/shower-tile-texture_s9tuvw.jpg')",
        'woodrpr-ptrn':
          "url('https://res.cloudinary.com/edwindanlopez/image/upload/v1634746201/BBS/Website-Assets/category-texture-tiles/wood-repairs-tile-texture_jxgrxg.jpg')",
      }),
      colors: {
        dark: '#232323',
        mildGray: '#505050',
        lightGray: '#818389',
        brown: '#604E3F',
        tan: '#A3856E',
        neutral: '#B9B2AD',
        beige: '#E6DFD9',
        pasteleGreen: '#D1DED5',
        softGreen: '#739B7E',
        mossGreen: '#215130',
        orangeAmber: '#B85F53',
      },
      fontFamily: {
        sans: ['Expressway', 'sans-serif'],
      },
      scale: {
        175: '1.75',
        200: '2.0',
        215: '2.15',
        225: '2.25',
        250: '2.5',
        275: '2.75',
      },
      zIndex: {
        '-5': '-5',
        '-10': '-10',
        '-20': '-20',
        '-30': '-30',
      },
    },
  },
  variants: {
    extend: {
      /* for use with collapse or accordion component */
      transitionProperty: {
        height: 'height',
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('@tailwindcss/aspect-ratio')],
};
