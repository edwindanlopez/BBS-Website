import React, { useEffect, createContext, useState } from "react";
import { graphql } from "gatsby";
import tw from "twin.macro";

import Layout from "../../components/Layout";
import WorkDetailPageWrapper from "../../components/layoutWrappers/WorkDetailPageWrapper";
import InfoCard from "../../components/detailPageCard";
import Lightbox from "../../components/Lightbox/Index";

const GridWrapper = tw.div`
  md:grid grid-cols-2 gap-3
`;

const ImageSlidesContext = createContext();

const WorkDetailPage = ({ data }) => {
  const nodes = data.allFile.nodes;
  const [imageSlides, setImageSlides] = useState([]);

  const fetchList = async () => {
    const images = [];
    nodes.map((node) => {
      images.push(node.childImageSharp);
    });
    return images;
  };

  useEffect(() => {
    fetchList().then((imgCollection) => {
      console.log("Image Slide Collection: ", imgCollection);
      setImageSlides(imgCollection);
    });
  }, []);

  return (
    <Layout seoTitle={data.mdx.frontmatter.title}>
      <WorkDetailPageWrapper>
        <GridWrapper>
          <ImageSlidesContext.Provider value={[imageSlides]}>
            {nodes.map((node) => {
              return <Lightbox node={node} key={node.childImageSharp.id} />;
            })}
          </ImageSlidesContext.Provider>
        </GridWrapper>
        <InfoCard {...data.mdx} />
      </WorkDetailPageWrapper>
    </Layout>
  );
};

export const getWork = graphql`
  query workDetailPage($slug: String!, $absolutePathSlug: String!) {
    mdx(slug: { eq: $slug }) {
      frontmatter {
        title
        subhead
        location
        date
        client
      }
      body
    }
    allFile(
      filter: {
        extension: { regex: "/(jpe?g|png|gif)/" }
        relativeDirectory: { eq: $absolutePathSlug }
      }
      sort: { fields: name, order: ASC }
    ) {
      nodes {
        childImageSharp {
          gatsbyImageData(
            backgroundColor: "#E3E1DF"
            placeholder: DOMINANT_COLOR
          )
          id
        }
        name
      }
    }
  }
`;

export default WorkDetailPage;
export { ImageSlidesContext };
