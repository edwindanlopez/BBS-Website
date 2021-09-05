module.exports = {
  mode: "jit",
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundSize: {
        "50%": "50%",
        16: "4rem",
      },
      backgroundImage: (theme) => ({
        "shower-ptrn":
          "url('https://daniellopezdesign.nyc3.digitaloceanspaces.com/BBS/category-texture-tiles/shower-tile-texture.jpg')",
        "floor-ptrn":
          "url('https://daniellopezdesign.nyc3.digitaloceanspaces.com/BBS/category-texture-tiles/floor-tile-texture.jpg')",
        "cbnt-ptrn":
          "url('https://daniellopezdesign.nyc3.digitaloceanspaces.com/BBS/category-texture-tiles/cabinets-tile-texture.jpg')",
        "mural-ptrn":
          "url('https://daniellopezdesign.nyc3.digitaloceanspaces.com/BBS/category-texture-tiles/mural-tile-texture.jpg')",
        "closet-ptrn":
          "url('https://daniellopezdesign.nyc3.digitaloceanspaces.com/BBS/category-texture-tiles/closets-tile-texture.jpg')",
        "woodrpr-ptrn":
          "url('https://daniellopezdesign.nyc3.digitaloceanspaces.com/BBS/category-texture-tiles/wood-repairs-tile-texture.jpg')",
        "illus-ptrn":
          "url('https://daniellopezdesign.nyc3.digitaloceanspaces.com/BBS/category-texture-tiles/illustrations-tile-texture.jpg')",
      }),
      colors: {
        dark: "#232323",
        mildgray: "#505050",
        ltgray: "#818389",
        brown: "#604E3F",
        tan: "#A3856E",
        neutral: "#B9B2AD",
        beige: "#E6DFD9",
        pasteleGreen: "#D1DED5",
        softGreen: "#739B7E",
        mossGreen: "#215130",
        orangeAmber: "#B85F53",
      },
      fontFamily: {
        sans: "Expressway",
      },
      scale: {
        175: "1.75",
        200: "2.0",
        215: "2.15",
        225: "2.25",
        250: "2.5",
        275: "2.75",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
