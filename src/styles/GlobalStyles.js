import React from "react";
import { Global, css } from "@emotion/react";
import { theme, GlobalStyles as BaseStyles } from "twin.macro";

const customStyles = css({
  body: {
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },
  h1: {
    fontFamily: theme`fontFamily.sans`,
    fontWeight: "600", //semibold
    fontSize: "1.5rem", //24px
    lineHeight: "1.625rem", //26px
    color: theme`colors.orangeAmber`,
  },
  h2: {
    fontFamily: theme`fontFamily.sans`,
    fontWeight: "600", //semibold
    fontSize: "1.25rem", //20px
    lineHeight: "1.5rem", //24px
    characterSpacing: "-8px",
    color: theme`colors.mildgray`,
  },
  h3: {
    fontFamily: theme`fontFamily.sans`,
    fontWeight: "800", //bold
    fontSize: "1rem", //16px
    lineHeight: "1.125rem", //18px
    color: theme`colors.ltgray`,
  },
  p: {
    fontFamily: theme`fontFamily.sans`,
    fontWeight: "400", //regular
    fontSize: "1rem", //16px
    lineHeight: "1.375rem", //22px
    color: theme`colors.dark`,
  },
  ".break": {
    flexBasis: "100%",
    height: "0",
  },
  "div[data-reach-dialog-overlay]": {
    // TODO: add media query
  },
  "div[data-reach-dialog-content]": {
    // TODO: add media query
  },
  /*Swiper------------------------- */
  ".swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet, .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet":
    {
      backgroundColor: "white",
    },
  /*Scrolling------------------------- */
  /* width */
  "::-webkit-scrollbar": {
    width: "10px",
    height: "10px",
  },

  /* Track */
  "::-webkit-scrollbar-track": {
    borderRadius: "100vh",
    background: "#edf2f7",
  },

  /* Handle */
  "::-webkit-scrollbar-thumb": {
    background: "#cbd5e0",
    borderRadius: "100vh",
    border: "3px solid #edf2f7",
  },

  /* Handle on hover */
  "::-webkit-scrollbar-thumb:hover": {
    background: "#a0aec0",
  },

  /*Lightbox buttons------------------------- */
  ".right-arrow-button:hover svg.right-arrow-icon": {
    opacity: "1",
  },
  ".left-arrow-button:hover svg.left-arrow-icon": {
    opacity: "1",
  },
  /*Form Styling------------------------- */
});

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
