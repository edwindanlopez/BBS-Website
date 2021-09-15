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

    return result.data.allMdx.group.map((cat) => ({
      ...cat,
    }));
  },
};
