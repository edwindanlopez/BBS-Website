import * as React from 'react';
import { wrap } from 'popmotion';
import 'twin.macro';

import PropTypes from 'prop-types';
import { DialogContent as ReachDialogContent } from '@reach/dialog';
import DialogControls from './DialogControls';
import MotionWrapper from './MotionWrapper';
import Video from '../Video';
import useZoomPanGestures from '../../utils/useZoomPanGestures';

export default function DialogContent({ state, ltBox, setLtBox }) {
  const [framerMotionDrag, setFramerMotionDrag] = React.useState('x');
  const { slides } = state;
  const { node, direction } = ltBox;

  const slide = React.useMemo(
    () => slides.findIndex((el) => el.name === node.name),
    [node, slides]
  );

  const paginate = (newDirection) => {
    // cycle images indefinitely by wrapping array index back at the beginning
    const newImageIndex = wrap(0, slides.length, slide + newDirection);
    const newImageNode = slides[newImageIndex];
    setLtBox((currentState) => ({
      ...currentState,
      node: newImageNode,
      direction: newDirection,
    }));
  };

  const { crop, setRef } = useZoomPanGestures({
    framerMotionDrag,
    setFramerMotionDrag,
  });

  return (
    <ReachDialogContent
      aria-label="gallery image"
      className="dialog-content"
      style={{
        backgroundColor: 'unset',
        margin: 'auto',
        zIndex: 40,
      }}
      tw="w-screen h-[50vh] md:(w-[70vw]) xl:(w-[50vw] h-[60vh]) p-[0px] top-0 bottom-0 right-0 left-0 fixed"
    >
      <>
        <MotionWrapper
          direction={direction}
          slide={slide}
          paginate={paginate}
          framerMotionDrag={framerMotionDrag}
        >
          {node.childImageSharp ? (
            <img
              ref={setRef}
              src={node.childImageSharp.gatsbyImageData.images.fallback.src}
              alt={node.childImageSharp.gatsbyImageData.images.fallback.srcSet}
              style={{
                height: 'auto',
                left: crop.x,
                top: crop.y,
                bottom: crop.b,
                right: crop.r,
                transform: `scale(${crop.scale})`,
                touchAction: 'none',
                position: 'absolute',
                margin: 'auto',
              }}
            />
          ) : (
            <Video
              videoSrcURL={node.video}
              autoPlay
              tw="w-full m-[0 auto] h-full"
            />
          )}
        </MotionWrapper>
        <DialogControls paginate={paginate} setLtBox={setLtBox} />
      </>
    </ReachDialogContent>
  );
}

DialogContent.propTypes = {
  state: PropTypes.shape({
    status: PropTypes.string,
    slides: PropTypes.oneOfType([PropTypes.array, PropTypes.shape()]),
    error: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  }),
  ltBox: PropTypes.shape({
    isOpen: PropTypes.bool,
    node: PropTypes.shape(),
    direction: PropTypes.number,
  }),
  setLtBox: PropTypes.func,
};

DialogContent.defaultProps = {
  state: {
    status: '',
    slides: [],
    error: null,
  },
  ltBox: {
    isOpen: true,
    node: {},
    direction: 0,
  },
  setLtBox: () => {},
};
