import React, { useState, useRef } from 'react';
import { useGesture } from '@use-gesture/react';
import PropTypes from 'prop-types';
import 'twin.macro';

export default function ZoomPanContainer({
  framerMotionDrag,
  setFramerMotionDrag,
  containerBounds,
  children,
}) {
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });
  const imageBoundsRef = useRef();
  const latestImgScaleBoundaries = useRef();

  const adjustImageView = ({ offset: [zoom] }) => {
    const newCrop = crop;

    // const originalImgScaleBoundaries = latestImgScaleBoundaries.current;
    const imageBounds = imageBoundsRef.current.getBoundingClientRect();

    // clientWidth is original width of node and isn't affected by zoom(scale);
    const xOverhang = (imageBounds.width - containerBounds.width) / 2;
    const yOverhang = (imageBounds.height - containerBounds.height) / 2;

    if (zoom >= 1) {
      // snap to left and right
      if (imageBounds.left > containerBounds.left) {
        newCrop.x = xOverhang;
      } else if (imageBounds.right < containerBounds.right) {
        newCrop.x = -(imageBounds.width - containerBounds.width) + xOverhang;
      }

      // snap to top and bottom
      if (imageBounds.top > containerBounds.top) {
        newCrop.y = 0;
      } else if (imageBounds.bottom < containerBounds.bottom) {
        newCrop.y = -(imageBounds.height - containerBounds.height) + yOverhang;
      }
    }

    setCrop(newCrop);
  };

  const delegateDragCtrl = () => {
    // delegate dragging control to Framer Motion
    if (framerMotionDrag !== 'x') {
      setFramerMotionDrag('x');
    } else if (framerMotionDrag) {
      // dragging controlled by this component
      setFramerMotionDrag(false);
    }
  };

  useGesture(
    {
      onDrag: ({ offset: [dx, dy] }) => {
        // if image is zoomed at least 1.12, allow dragging(panning) of photo
        if (crop.scale > 1.12) {
          setCrop((prevVal) => ({
            ...prevVal,
            x: dx,
            y: dy,
          }));
        }
      },
      onDragEnd: (props) => adjustImageView(props),
      onPinch: ({ offset: [z] }) => {
        if (z <= 1) {
          delegateDragCtrl();
          setCrop({
            x: 0,
            y: 0,
            scale: 1,
          });
        } else {
          delegateDragCtrl();
          setCrop((prevVal) => ({
            ...prevVal,
            scale: z,
          }));
        }
      },
      onPinchEnd: (props) => {
        delegateDragCtrl();
        latestImgScaleBoundaries.current =
          imageBoundsRef.current.getBoundingClientRect();
        adjustImageView(props);
      },
    },
    {
      drag: {
        from: () => [crop.x, crop.y],
      },
      pinch: {
        distanceBounds: { min: 1 },
      },
      target: imageBoundsRef,
      eventOptions: { passive: false },
    }
  );

  return (
    <div
      ref={imageBoundsRef}
      className="zoom-pan-container"
      style={{
        position: 'relative',
        left: crop.x,
        top: crop.y,
        transform: `scale(${crop.scale})`,
        touchAction: 'none',
      }}
      tw="w-full h-full flex justify-center items-center"
    >
      {children}
    </div>
  );
}

ZoomPanContainer.propTypes = {
  framerMotionDrag: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setFramerMotionDrag: PropTypes.func,
  containerBounds: PropTypes.shape({
    bottom: PropTypes.number,
    height: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  children: PropTypes.element,
};

ZoomPanContainer.defaultProps = {
  framerMotionDrag: 'x',
  setFramerMotionDrag: () => {},
  containerBounds: {},
  children: undefined,
};
