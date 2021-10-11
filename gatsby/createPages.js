const path = require("path");
const createCategoriesPages = require("./pagination/createCategoriesPages.js");
const createWorkDetailPages = require("./pagination/createWorkDetailPages");
const { getAllCategories } = require("./constants/categories");

// generate detail pages for the workPortfolio
const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const allCategories = await getAllCategories(graphql);

  // query all work
  const result = await graphql(`
    query AllWork {
      allMdx(sort: { order: DESC, fields: frontmatter___date }) {
        edges {
          node {
            frontmatter {
              title
              location
              date
              featured_images {
                id
                childImageSharp {
                  gatsbyImageData
                  id
                }
              }
              tags
            }
            id
            slug
            body
            excerpt(pruneLength: 75)
          }
        }
        totalCount
      }
    }
  `);

  // create pagination for main work page
  result.data.allMdx.edges.map((edge, i, arr) => {
    const pageSlug = `/work/`;
    const postsPerPage = 5;
    const numPages = Math.ceil(arr.length / postsPerPage);

    let counter = 0;

    for (let i = 0; i < numPages; i += 1) {
      let edges = [];

      for (let j = 0; j < postsPerPage; j++) {
        edges.push(result.data.allMdx.edges[counter]);
        counter += 1;
      }

      createPage({
        path: i === 0 ? pageSlug : `${pageSlug}page/${i}/`,
        component: path.resolve(`src/templates/WorkAll.js`),
        context: {
          edges,
          category: "all",
          allCategories,
          currentPage: i,
          postsLimit: postsPerPage,
          postsOffset: i * postsPerPage,
          prevPagePath: i <= 1 ? pageSlug : `${pageSlug}page/${i - 1}/`,
          nextPagePath: `${pageSlug}page/${i + 1}/`,
          numPages: [...Array(numPages).keys()],
          hasPrevPage: i !== 0,
          hasNextPage: i !== numPages - 1,
          pageSlug,
        },
      });

      edges = [];
    }
    counter = 0;
    return null;
  });

  // Feeds
  await createCategoriesPages(graphql, actions);
  await createWorkDetailPages(graphql, actions);
};

module.exports = createPages;
