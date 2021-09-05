require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    url: `https://www.buildbeautifulspaces.com`, // No trailing slash allowed!
    title: "BBS",
    description: "Build Beautiful Spaces - Bring your space to the next level.",
    image: "./src/images/bbs-build-beautiful-spaces.png",
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `work`,
        path: `${__dirname}/workPortfolio`,
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        typekit: {
          id: process.env.TYPEKIT_ID,
        },
      },
    },
    "gatsby-transformer-sharp",
  ],
};
