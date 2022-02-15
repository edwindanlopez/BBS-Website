import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import 'twin.macro';

import FeatWorkTiles from './FeatWorkTiles';
import PageLayoutWrapper from '../layoutWrappers/PageLayoutWrapper';

const query = graphql`
  query {
    allMdx(filter: { frontmatter: { featured_type: { eq: "Primary" } } }) {
      nodes {
        id
        frontmatter {
          hero_image_alt
          title
          hero_image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        slug
      }
    }
  }
`;

function FeaturedWork() {
  const data = useStaticQuery(query);
  return (
    <PageLayoutWrapper>
      <>
        <h2 tw="mb-4">Featured Works</h2>
        <FeatWorkTiles data={data} />
      </>
    </PageLayoutWrapper>
  );
}

export default FeaturedWork;
