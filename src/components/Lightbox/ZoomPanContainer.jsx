import React, { useState, useRef } from 'react';
import { useGesture } from '@use-gesture/react';
import PropTypes from 'prop-types';
import 'twin.macro';

export default function ZoomPanContainer({ setFramerMotionDrag, children }) {
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });
  const containerRef = useRef();

  useGesture(
    {
      onDrag: ({ offset: [dx, dy] }) =>
        crop.scale > 1.12 &&
        setCrop((prevVal) => ({
          ...prevVal,
          x: dx,
          y: dy,
        })),
      onPinch: ({ offset: [d] }) =>
        d <= 1
          ? (setFramerMotionDrag('x'),
            setCrop((prevVal) => ({
              ...prevVal,
              scale: 1,
            })))
          : (setFramerMotionDrag(false),
            setCrop({
              x: 0,
              y: 0,
              scale: d,
            })),
    },
    {
      target: containerRef,
      eventOptions: { passive: false },
    }
  );

  return (
    <div
      className="zoom-pan-container"
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        position: 'relative',
        left: crop.x,
        top: crop.y,
        transform: `scale(${crop.scale})`,
        touchAction: 'none',
      }}
    >
      {children}
    </div>
  );
}

ZoomPanContainer.propTypes = {
  setFramerMotionDrag: PropTypes.func,
  children: PropTypes.element,
};

ZoomPanContainer.defaultProps = {
  setFramerMotionDrag: () => {},
  children: undefined,
};
