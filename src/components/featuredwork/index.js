import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import "twin.macro";

import FeatWorkTiles from "./FeatWorkTiles";

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
    <div>
      <h2 tw='mb-4'>Featured Works</h2>
      <FeatWorkTiles data={data} />
    </div>
  );
};

export default FeaturedWork;
