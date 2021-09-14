import React, { useEffect, useState, useMemo } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";
import tw from "twin.macro";

import Layout from "../../components/Layout";
import WorkDetailPageWrapper from "../../components/layoutWrappers/WorkDetailPageWrapper";
import InfoCard from "../../components/detailPageCard";
import Lightbox from "../../components/Lightbox/Index";
import { DialogContext } from "../../components/Lightbox/DialogContext";

const GridWrapper = tw.div`
  md:grid grid-cols-2 gap-3
`;

const WorkDetailPage = ({ data }) => {
  const nodes = data.allFile.nodes;

  const [imageSlides, setImageSlides] = useState(null);
  const [[imgNode, direction], setImgNode] = React.useState([false, 0]);
  const [showDialog, setShowDialog] = React.useState(false);

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
    [showDialog, imgNode, imageSlides]
  );

  const PreviewButton = tw.button`
    bg-transparent border-0
  `;

  const fetchList = async () => {
    const images = [];
    nodes.map((node) => {
      images.push(node.childImageSharp);
    });
    return images;
  };

  useEffect(() => {
    fetchList().then((imgCollection) => {
      setImageSlides(imgCollection);
    });
  }, []);

  return (
    <Layout seoTitle={data.mdx.frontmatter.title}>
      <WorkDetailPageWrapper>
        <GridWrapper>
          <DialogContext.Provider value={providerVal}>
            <Lightbox />
          </DialogContext.Provider>
          {nodes.map((node) => {
            const imageFromNode = node.childImageSharp;
            return (
              <div
                tw='flex justify-center items-center mb-2'
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
