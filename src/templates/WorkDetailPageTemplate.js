import React, { useEffect, useState, useMemo } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";
import tw from "twin.macro";

import Layout from "../components/layoutWrappers/Layout";
import WorkDetailPageWrapper from "../components/layoutWrappers/WorkDetailPageWrapper";
import InfoCard from "../components/detailPageInfoCard";
import Lightbox from "../components/Lightbox/Index";
import { DialogContext } from "../components/Lightbox/DialogContext";

const WorkDetailPageTemplate = ({ data }) => {
  const [imageSlides, setImageSlides] = useState(null);
  const [[imgNode, direction], setImgNode] = React.useState([false, 0]);
  const [showDialog, setShowDialog] = React.useState(false);
  const nodes = data.allFile.nodes;

  const handleOpen = (imageFromNode) => {
    setShowDialog(true);
    setImgNode([imageFromNode, 0]);
  };

  const providerVal = useMemo(
    () => ({
      showDialog,
      setShowDialog,
      imgNode,
      direction,
      setImgNode,
      imageSlides,
    }),
    [showDialog, direction, imgNode, imageSlides]
  );

  useEffect(() => {
    let images = [];
    nodes &&
      nodes.map((node) => {
        return images.push(node.childImageSharp);
      });
    setImageSlides(images);
  }, [nodes]);

  return (
    <Layout seoTitle={data.mdx.frontmatter.title} tw='bg-dark'>
      <WorkDetailPageWrapper tw='md:(mt-3 self-start)'>
        <GridWrapper>
          <DialogContext.Provider value={providerVal}>
            <Lightbox />
          </DialogContext.Provider>
          {nodes.map((node) => {
            const imageFromNode = node.childImageSharp;
            return (
              <div
                tw='flex aspect-w-4 aspect-h-3 justify-center items-center mb-3 md:mb-0'
                key={node.childImageSharp.id}
              >
                <PreviewButton onClick={() => handleOpen(imageFromNode)}>
                  <GatsbyImage
                    image={getImage(imageFromNode)}
                    alt={node.name}
                    tw='h-full w-full object-center object-cover'
                  />
                </PreviewButton>
              </div>
            );
          })}
        </GridWrapper>
      </WorkDetailPageWrapper>
      <InfoCard {...data.mdx} />
    </Layout>
  );
};

const GridWrapper = tw.div`
  w-full md:(grid grid-cols-2 gap-3) xl:(grid grid-cols-3 gap-3 mb-3)
`;

const PreviewButton = tw.button`
  bg-transparent border-0
`;

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
            layout: FULL_WIDTH
          )
          id
        }
        name
      }
    }
  }
`;

export default WorkDetailPageTemplate;
