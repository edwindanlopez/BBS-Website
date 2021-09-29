const path = require("path");
const createCategoriesPages = require("./pagination/createCategoriesPages.js");
const createWorkDetailPages = require("./pagination/createWorkDetailPages");
const { getAllCategories } = require("./constants/categories");

// generate detail pages for the workPortfolio
const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const allCategories = await getAllCategories(graphql);

  // Work page - display all work
  createPage({
    path: "/work/",
    component: path.resolve(`../src/templates/WorkAll.js`),
    context: { allCategories },
  });

  // Feeds
  await createCategoriesPages(graphql, actions);
  await createWorkDetailPages(graphql, actions);
};

module.exports = createPages;
