import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import "twin.macro";

import HomepageWrapper from "../layoutWrappers/HomepageWrapper";
import Work from "./Work";

const query = graphql`
  query queryFeaturedWork {
    allMdx {
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

const FeaturedWork = () => {
  const data = useStaticQuery(query);

  return (
    <HomepageWrapper>
      <h2 tw='mb-4'>Featured Works</h2>
      <Work data={data} />
    </HomepageWrapper>
  );
};

export default FeaturedWork;
