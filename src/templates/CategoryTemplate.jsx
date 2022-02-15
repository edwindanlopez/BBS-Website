import React from 'react';
import { Link, graphql } from 'gatsby';
import 'twin.macro';

import PropTypes from 'prop-types';
import Layout from '../components/layoutWrappers/Layout';
import PageLayoutWrapper from '../components/layoutWrappers/PageLayoutWrapper';
import WorkTiles from '../components/WorkTiles';
import CategoryFilter from '../components/categories/CategoryFilter';
import Tags from '../components/Tags';

function CategoryTemplate({ data, pageContext }) {
  const { nodes } = data.allMdx;

  const { allCategories, category } = pageContext;

  return (
    <Layout seoTitle="Work">
      <PageLayoutWrapper>
        <>
          <CategoryFilter allCategories={allCategories} category={category} />
          {nodes.map((node) => (
            <div className="work-collection" key={node.id} tw="mt-10 mb-10">
              <div>
                <h2 tw="mt-4 mb-4">{node.frontmatter.title}</h2>
                <WorkTiles node={node} />
              </div>
              <div tw="flex justify-between items-center">
                <h3 tw="text-mildGray mt-4 mb-2">
                  {node.frontmatter.location}
                </h3>
                <Tags tags={node.frontmatter.tags} />
              </div>
              <p tw="text-lightGray">{node.excerpt}</p>
              <Link to={`/work/${node.slug}`} tw="h-96">
                <p tw="text-sm font-semibold text-orangeAmber mt-2">
                  View All {node.frontmatter.numOfTotalImages} images
                </p>
              </Link>
            </div>
          ))}
        </>
      </PageLayoutWrapper>
    </Layout>
  );
}

export const query = graphql`
  query ($category: String, $postsLimit: Int!, $postsOffset: Int!) {
    allMdx(
      limit: $postsLimit
      skip: $postsOffset
      filter: { frontmatter: { category: { eq: $category } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      nodes {
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
          numOfTotalImages
          tags
        }
        id
        slug
        body
        excerpt(pruneLength: 75)
      }
    }
  }
`;

export default CategoryTemplate;

CategoryTemplate.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
  pageContext: PropTypes.shape({
    allCategories: PropTypes.arrayOf(PropTypes.object),
    category: PropTypes.string,
  }),
};

CategoryTemplate.defaultProps = {
  data: {},
  pageContext: {},
};
