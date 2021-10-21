require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    url: `https://www.buildbeautifulspaces.com`, // No trailing slash allowed!
    title: "BBS - Build Beautiful Spaces",
    titleAlt: "Build Beautiful Spaces",
    headline: "Bring your space to the next level.",
    description:
      "BBS helps create and transform spaces, adding value and beauty to your home.",
    image: "/bbs-build-beautiful-spaces.jpg",
    logo: "/bbs-logo.svg",
    siteLanguage: "en",
    ogLanguage: "en_US",
    facebook: "build-beautiful-spaces",
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `work`,
        path: `${__dirname}/workPortfolio`,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `Build Beautiful Spaces`,
        short_name: `BBS`,
        start_url: `/`,
        background_color: `#fefefe`,
        theme_color: `#505050`,
        display: `standalone`,
        icon: `src/images/icon.png`,
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
    {
      resolve: "gatsby-transformer-remark",
      // Footnotes mode (default: true)
      footnotes: true,
      // GitHub Flavored Markdown mode (default: true)
      gfm: true,
      // Plugins configs
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              loadingStrategy: "lazy", //Optional: Enable support for lazy-load offscreen iframes. Default is disabled.
              //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
              // urlOverrides: [
              //   {
              //     id: "youtube",
              //     embedURL: (videoId) =>
              //       `https://www.youtube-nocookie.com/embed/${videoId}`,
              //   },
              // ],
              containerClass: "embedVideo-container", //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
              iframeId: false, //Optional: if true, iframe's id will be set to what is provided after 'video:' (YouTube IFrame player API requires iframe id)
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "G-L2QVVR23HE",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        anonymize: true,
        respectDNT: true,
        // Any additional optional fields
        cookieDomain: "buildbeautifulspaces.com",
        enableWebVitalsTracking: true,
      },
    },
  ],
};
