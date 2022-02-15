import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import 'twin.macro';

import Project from './Project';
import PageLayoutWrapper from '../layoutWrappers/PageLayoutWrapper';

const query = graphql`
  query queryOtherProjects {
    allMdx(filter: { frontmatter: { featured_type: { eq: "Secondary" } } }) {
      nodes {
        id
        frontmatter {
          secondary_hero_image_alt
          title
          secondary_hero_image {
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

export default function Otherprojects() {
  const data = useStaticQuery(query);
  return (
    <PageLayoutWrapper>
      <>
        <h2 tw="mt-6 mb-4">Other Projects</h2>
        <Project data={data} />
      </>
    </PageLayoutWrapper>
  );
}
