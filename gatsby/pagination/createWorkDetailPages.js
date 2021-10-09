const path = require("path");
const { getAllCategories } = require("../constants/categories");

module.exports = async (graphql, actions) => {
  const { createPage } = actions;
  const allCategories = await getAllCategories(graphql);

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

    // pass both the slug and absolute path without trailing slash
    // to use for querying in the WorkDetailPageTemplate
    result.data.allMdx.edges.forEach((edge) => {
      // for some reason when filtering allMdx with a fileAbsolutePath, gatsby includes the trailing slash which can
      // cause problems when querying with parameters. This is the reason for manually removing the trailing slash here
      // to then pass down to the page template
      const removedTrailingSlash = edge.node.slug.replace(/\/$/gm, "");

      createPage({
        path: `/work/${edge.node.slug}`,
        component: path.resolve(`src/templates/WorkDetailPageTemplate.js`),
        context: {
          slug: `${edge.node.slug}`,
          absolutePathSlug: removedTrailingSlash,
          allCategories,
        },
      });
    });
  });
};
