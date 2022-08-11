import * as React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import tw from 'twin.macro';
import PropTypes from 'prop-types';

import { DialogOverlay } from '@reach/dialog';
import DialogContent from '../components/LightBox/DialogContent';
import '@reach/dialog/styles.css';

import Layout from '../components/layoutWrappers/Layout';
import WorkDetailPageWrapper from '../components/layoutWrappers/WorkDetailPageWrapper';
import InfoCard from '../components/detailPageInfoCard';
import Video from '../components/Video';
import useGenerateProjectMedia from '../utils/useGenerateProjectMedia';
import useLightBoxSwitch from '../utils/useLightBox';

const GridWrapper = tw.div`
  w-full md:(grid grid-cols-2 gap-3) xl:(grid grid-cols-3 gap-3 mb-3)
`;

const ViewLightBoxButton = tw.button`
  bg-transparent border-4 border-[#232323] hover:border-white hover:rounded-lg
`;

function WorkDetailPageTemplate({ data }) {
  const frontMatter = data.mdx.frontmatter;
  const imgs = data.allFile.nodes;
  const vids = frontMatter.videos;

  console.log('frontMatter: ', frontMatter);

  const { state, dispatch, generateSlides } = useGenerateProjectMedia();

  const { status, slides } = state;

  React.useEffect(() => {
    if (data) {
      generateSlides(imgs, vids)
        .then((slidesResult) => {
          dispatch({
            status: 'resolved',
            slides: slidesResult,
          });
        })
        .catch((err) => {
          console.log('Caught error in generating slides: ', err);
          dispatch({
            status: 'rejected',
            slides: null,
            error: err,
          });
        });
    }
  }, [data, dispatch, generateSlides, imgs, vids]);

  const { ltBox, setLtBox } = useLightBoxSwitch();

  const handleLtBoxClick = (node) => {
    console.log('setting this node from page template: ', node);
    setLtBox((currentState) => ({
      ...currentState,
      isOpen: true,
      node,
    }));
  };

  return (
    <Layout seoTitle={frontMatter.title} tw="bg-dark">
      <WorkDetailPageWrapper tw="md:(mt-3 self-start)">
        {status === 'resolved' && (
          <>
            <GridWrapper>
              <DialogOverlay
                isOpen={ltBox.isOpen}
                onDismiss={() =>
                  setLtBox({
                    isOpen: false,
                    node: null,
                    direction: 0,
                  })
                }
                className="dialog-overlay"
                aria-label="image in light box mode"
                style={{
                  backgroundColor: '#000000',
                }}
                tw="w-auto h-screen m-auto overflow-hidden z-40"
                allowPinchZoom
              >
                <DialogContent
                  state={state}
                  ltBox={ltBox}
                  setLtBox={setLtBox}
                />
              </DialogOverlay>
              {slides.length &&
                slides.map((node) => {
                  // currently slides can only be image or video
                  if (node.childImageSharp) {
                    return (
                      <div
                        tw="flex aspect-w-4 aspect-h-3 justify-center items-center mb-3 md:mb-0"
                        key={node.childImageSharp.id}
                      >
                        <ViewLightBoxButton
                          onClick={() => handleLtBoxClick(node)}
                        >
                          <GatsbyImage
                            image={getImage(
                              node.childImageSharp.gatsbyImageData
                            )}
                            alt={node.name}
                            tw="h-full w-full object-center object-cover"
                          />
                        </ViewLightBoxButton>
                      </div>
                    );
                  }
                  return (
                    <div
                      tw="flex aspect-w-4 aspect-h-3 justify-center items-center mb-3 object-cover object-center overflow-hidden md:mb-0"
                      key={node.video}
                    >
                      <ViewLightBoxButton
                        onClick={() => handleLtBoxClick(node)}
                      >
                        <Video videoSrcURL={node.video} tw="w-full h-full" />
                      </ViewLightBoxButton>
                    </div>
                  );
                })}
            </GridWrapper>
            <InfoCard {...data.mdx} />
          </>
        )}
      </WorkDetailPageWrapper>
    </Layout>
  );
}

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
      nodes: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
};

WorkDetailPageTemplate.defaultProps = {
  data: {},
};
