import React, { useEffect, useState, useMemo } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import tw from 'twin.macro';
import PropTypes from 'prop-types';
import LightBoxContext from '../components/LightBox/LightBoxContext';

import Layout from '../components/layoutWrappers/Layout';
import WorkDetailPageWrapper from '../components/layoutWrappers/WorkDetailPageWrapper';
import InfoCard from '../components/detailPageInfoCard';
import LightBox from '../components/LightBox/Index';
import Video from '../components/Video';

function WorkDetailPageTemplate({ data }) {
  const [imageSlides, setImageSlides] = useState([]); // array of objects
  const [[imgNode, direction], setImgNode] = useState([false, 0]);
  const [showDialog, setShowDialog] = useState(null);

  const frontMatter = data.mdx.frontmatter;
  const incomingImages = data.allFile.nodes;
  const incomingVideos = frontMatter.videos;

  const handleOpen = (imageFromNode) => {
    setShowDialog(true);
    setImgNode([imageFromNode, 0]);
  };

  useEffect(() => {
    async function compileWork(images, videos) {
      const compiledWork = [];

      await new Promise((resolve) => {
        resolve(images.map((node) => compiledWork.push(node)));
      })
        .then(
          () =>
            videos &&
            videos.map((vidUrl) => {
              const vidName = vidUrl
                .substring(vidUrl.lastIndexOf('/') + 1)
                .replace('.MOV', '');
              return compiledWork.push({ video: vidUrl, name: vidName });
            })
        )
        .then(() => setImageSlides(compiledWork))
        .catch((error) => {
          console.log('Promise error: ', error);
          throw new Error(error);
        });
    }
    compileWork(incomingImages, incomingVideos);
  }, [incomingImages, incomingVideos]);

  const LightBoxValues = useMemo(
    () => ({
      showDialog,
      setShowDialog,
      imgNode,
      direction,
      setImgNode,
      imageSlides,
      setImageSlides,
    }),
    [showDialog, imgNode, direction, imageSlides]
  );

  return (
    <Layout seoTitle={frontMatter.title} tw="bg-dark">
      <>
        <WorkDetailPageWrapper tw="md:(mt-3 self-start)">
          <GridWrapper>
            <LightBoxContext.Provider value={LightBoxValues}>
              <LightBox />
            </LightBoxContext.Provider>
            {imageSlides &&
              // node will be an object either containing gatsbyImageData & name, OR, video url
              imageSlides.map((node) => {
                if (node.childImageSharp) {
                  return (
                    <div
                      tw="flex aspect-w-4 aspect-h-3 justify-center items-center mb-3 md:mb-0"
                      key={node.childImageSharp.id}
                    >
                      <PreviewButton onClick={() => handleOpen(node)}>
                        <GatsbyImage
                          image={getImage(node.childImageSharp.gatsbyImageData)}
                          alt={node.name}
                          tw="h-full w-full object-center object-cover"
                        />
                      </PreviewButton>
                    </div>
                  );
                }
                return (
                  <div
                    tw="flex aspect-w-4 aspect-h-3 justify-center items-center mb-3 object-cover object-center overflow-hidden md:mb-0"
                    key={node.video}
                  >
                    <PreviewButton onClick={() => handleOpen(node)}>
                      <Video videoSrcURL={node.video} tw="w-full h-full" />
                    </PreviewButton>
                  </div>
                );
              })}
          </GridWrapper>
        </WorkDetailPageWrapper>
        <InfoCard {...data.mdx} />
      </>
    </Layout>
  );
}

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

WorkDetailPageTemplate.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        videos: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
    allFile: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
};

WorkDetailPageTemplate.defaultProps = {
  data: {},
};
