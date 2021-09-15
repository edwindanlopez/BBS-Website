module.exports = {
  getAllCategories: async (graphql) => {
    const result = await graphql(`
      query AllTheCategories {
        allMdx {
          group(field: frontmatter___category) {
            fieldValue
            totalCount
          }
        }
      }
    `);

    console.log("Result from 1st getAllCategories query: ", result);

    return result.data.allMdx.group.map((cat) => ({
      ...cat,
    }));
  },
};
