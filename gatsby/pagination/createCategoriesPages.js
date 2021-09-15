const path = require("path");
const { getAllCategories } = require("../constants/categories");

module.exports = async (graphql, actions) => {
  const { createPage } = actions;
  const allCategories = await getAllCategories(graphql);

  const result = await graphql(`
    {
      allMdx {
        group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  result.data.allMdx.group.map((category) => {
    const numPages = Math.ceil(category.totalCount / 10);
    const categorySlug = `/category/${category.fieldValue}/`;

    for (let i = 0; i < numPages; i += 1) {
      createPage({
        path: i === 0 ? categorySlug : `${categorySlug}/page/${i}/`,
        component: path.resolve(`src/templates/categoryTemplate.js`),
        context: {
          category: category.fieldValue,
          allCategories,
          currentPage: i,
          postsLimit: 10,
          postsOffset: i * 10,
          prevPagePath: i <= 1 ? categorySlug : `${categorySlug}/page/${i - 1}`,
          nextPagePath: `/${categorySlug}/page/${i + 1}`,
          hasPrevPage: i !== 0,
          hasNextPage: i !== numPages - 1,
        },
      });
    }
    return null;
  });
};
