const path = require("path");
const createCategoriesPages = require("./pagination/createCategoriesPages.js");
const createWorkDetailPages = require("./pagination/createWorkDetailPages");

// generate detail pages for the workPortfolio
const createPages = async ({ graphql, actions }) => {
  // const { createPage } = actions;

  // Feeds
  await createCategoriesPages(graphql, actions);
  await createWorkDetailPages(graphql, actions);
};

module.exports = createPages;
