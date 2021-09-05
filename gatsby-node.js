const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(
    `src/pages/work/workDetailPageTemplate.js`
  );

  return graphql(
    `
      query absolutePath {
        allMdx(filter: { fileAbsolutePath: { regex: "/workPortfolio/" } }) {
          edges {
            node {
              slug
              fileAbsolutePath
            }
          }
        }
      }
    `,
    { limit: 1000 }
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    // Create detail page for each item
    result.data.allMdx.edges.forEach((edge) => {
      const removedTrailingSlash = edge.node.slug.replace(/\/$/gm, "");

      createPage({
        path: `/work/${edge.node.slug}`,
        component: blogPostTemplate,
        context: {
          slug: `${edge.node.slug}`,
          absolutePathSlug: removedTrailingSlash,
        },
      });
    });
  });
};
