import React from 'react';
import { Global, css } from '@emotion/react';
import { theme, GlobalStyles as BaseStyles } from 'twin.macro';
import arrowLeft from '../images/arrow-left.svg';
import arrowRight from '../images/arrow-right.svg';

const customStyles = css({
  body: {
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  h1: {
    fontFamily: theme`fontFamily.sans`,
    fontWeight: '600', // semibold
    fontSize: '1.5rem', // 24px
    lineHeight: '2.15rem', // 26px
    color: theme`colors.orangeAmber`,
  },
  h2: {
    fontFamily: theme`fontFamily.sans`,
    fontWeight: '700', // bold
    fontSize: '2rem', // 20px
    lineHeight: '2.4rem', // 24px
    characterSpacing: '-8px',
    color: theme`colors.mildGray`,
  },
  h3: {
    fontFamily: theme`fontFamily.sans`,
    fontWeight: '800', // bold
    fontSize: '1rem', // 16px
    lineHeight: '1.125rem', // 18px
    color: theme`colors.lightGray`,
  },
  p: {
    fontFamily: theme`fontFamily.sans`,
    fontWeight: '400', // regular
    fontSize: '1rem', // 16px
    lineHeight: '1.375rem', // 22px
    color: theme`colors.dark`,
  },
  '.break': {
    flexBasis: '100%',
    height: '0',
  },
  '.visually-hidden': {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
  },
  '.freeze-body': {
    height: '100vh',
    overflow: 'hidden',
    touchAction: 'none',
    msTouchAction: 'none',
  },
  // /* Separate rule for compatibility, :focus-within is required on modern Firefox and Chrome */
  // "input.visually-hidden:focus + label": {
  //   outline: "thin dotted",
  // },
  // "input.visually-hidden:focus-within + label": {
  //   outline: "thin dotted",
  // },
  /* Gatsby image border radius for safari------------ */
  '.gatsby-image-wrapper picture img': {
    borderRadius: '0.375rem',
  },
  /* Swiper------------------------- */
  '.swiper-scrollbar': {
    background: '#f7f7f7',
  },
  '.swiper-scrollbar-drag': {
    background: '#e8eaea',
  },
  '#feat-cat-slider.swiper-horizontal.swiper-pagination-bullets .swiper-pagination-bullet, .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet':
    {
      backgroundColor: 'white',
    },
  '@media only screen and (max-width: 995px) ': {
    '.swiper-button-next': {
      display: 'none',
    },
    '.swiper-button-prev': {
      display: 'none',
    },
  },
  '.swiper-button-next': {
    height: '27px',
    borderRadius: '100px',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    backgroundImage: `url(${arrowRight})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% auto',
    backgroundPosition: 'center',
  },
  '.swiper-button-prev': {
    height: '27px',
    borderRadius: '100px',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    backgroundImage: `url(${arrowLeft})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% auto',
    backgroundPosition: 'center',
  },
  '.swiper-button-next::after, .swiper-button-prev::after': {
    display: 'none',
  },
  /* Scrollbars ------------------------- */
  /* width */
  '::-webkit-scrollbar': {
    width: '10px',
    height: '10px',
  },

  /* Track */
  '::-webkit-scrollbar-track': {
    borderRadius: '100vh',
    background: '#edf2f7',
  },

  /* Handle */
  '::-webkit-scrollbar-thumb': {
    background: '#cbd5e0',
    borderRadius: '100vh',
    border: '3px solid #edf2f7',
  },

  /* Handle on hover */
  '::-webkit-scrollbar-thumb:hover': {
    background: '#a0aec0',
  },

  /* Lightbox buttons------------------------- */
  '.right-arrow-button:hover svg.right-arrow-icon': {
    opacity: '1',
  },
  '.left-arrow-button:hover svg.left-arrow-icon': {
    opacity: '1',
  },
  /* Cloudinary------------------------- */
  '.cloudinary-thumbnail img': {
    border: '#424442',
  },
  /* Recaptcha------------------------- */
  '.grecaptcha-badge': {
    visibility: 'hidden',
  },
});

function GlobalStyles() {
  return (
    <>
      <BaseStyles />
      <Global styles={customStyles} />
    </>
  );
}

export default GlobalStyles;
