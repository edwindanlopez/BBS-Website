import React, { useEffect, useState, useMemo } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";
import tw from "twin.macro";

import Layout from "../components/layoutWrappers/Layout";
import WorkDetailPageWrapper from "../components/layoutWrappers/WorkDetailPageWrapper";
import InfoCard from "../components/detailPageInfoCard";
import Lightbox from "../components/Lightbox/Index";
import { DialogContext } from "../components/Lightbox/DialogContext";
import Video from "../components/Video";

const WorkDetailPageTemplate = ({ data }) => {
  const [imageSlides, setImageSlides] = useState(null); // array of objects
  const [[imgNode, direction], setImgNode] = React.useState([false, 0]);
  const [showDialog, setShowDialog] = React.useState(false);
  const frontMatter = data.mdx.frontmatter;
  const incomingImages = data.allFile.nodes;
  const incomingVideos = frontMatter.videos;

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
    async function compileWork(images, videos) {
      let compiledWork = [];
      await new Promise((resolve, reject) => {
        resolve(images.map((node) => compiledWork.push(node)));
      })
        .then((result) => {
          videos.map((vidUrl) => {
            const vidName = vidUrl
              .substring(vidUrl.lastIndexOf("/") + 1)
              .replace(".MOV", "");
            return compiledWork.push({ video: vidUrl, name: vidName });
          });
          console.log("Logging compiled work: ", compiledWork);
        })
        .then(() => {
          return setImageSlides(compiledWork);
        })
        .catch((error) => {
          console.log("Promise error: ", error);
        });
    }
    compileWork(incomingImages, incomingVideos);
  }, [incomingImages, incomingVideos]);

  return (
    <Layout seoTitle={data.mdx.frontmatter.title} tw='bg-dark'>
      <WorkDetailPageWrapper tw='md:(mt-3 self-start)'>
        <GridWrapper>
          <DialogContext.Provider value={providerVal}>
            <Lightbox />
          </DialogContext.Provider>
          {imageSlides &&
            // node will be an object either containing gatsbyImageData & name, OR, video url
            imageSlides.map((node) => {
              if (node.childImageSharp) {
                return (
                  <div
                    tw='flex aspect-w-4 aspect-h-3 justify-center items-center mb-3 md:mb-0'
                    key={node.childImageSharp.id}
                  >
                    <PreviewButton onClick={() => handleOpen(node)}>
                      <GatsbyImage
                        image={getImage(node.childImageSharp.gatsbyImageData)}
                        alt={node.name}
                        tw='h-full w-full object-center object-cover'
                      />
                    </PreviewButton>
                  </div>
                );
              } else {
                return (
                  <div
                    tw='flex aspect-w-4 aspect-h-3 justify-center items-center mb-3 object-cover object-center overflow-hidden md:mb-0'
                    key={node.video}
                  >
                    <PreviewButton onClick={() => handleOpen(node)}>
                      <Video videoSrcURL={node.video} tw='w-full h-full' />
                    </PreviewButton>
                  </div>
                );
              }
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
  query ($slug: String!, $absolutePathSlug: String!) {
    mdx(slug: { eq: $slug }) {
      frontmatter {
        title
        subhead
        location
        date
        videos
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
