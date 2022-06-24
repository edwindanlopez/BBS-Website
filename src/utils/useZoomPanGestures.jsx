import * as React from 'react';
import { useGesture } from '@use-gesture/react';

const initCrop = {
  x: 0,
  y: 0,
  b: 0,
  r: 0,
  scale: 1,
};

export default function useZoomPanGestures({
  framerMotionDrag,
  setFramerMotionDrag,
}) {
  const [crop, setCrop] = React.useState(initCrop);
  const imageBoundsRef = React.useRef();
  const containerBoundsRef = React.useRef();

  React.useEffect(() => {
    const modalOverlay = window.document.querySelector('.dialog-overlay');
    containerBoundsRef.current = modalOverlay.getBoundingClientRect();
  }, []);

  const setRef = React.useCallback((imgNode) => {
    if (imageBoundsRef.current) {
      setCrop(initCrop);
    }
    // wait for the image dom node to load
    if (imgNode) {
      imageBoundsRef.current = imgNode;
    }
  }, []);

  const adjustImgBoundary = () => {
    const cB = containerBoundsRef.current;
    const iB = imageBoundsRef.current.getBoundingClientRect();
    const newCrop = crop;
    const xOverhang = (iB.width - cB.width) / 2;
    const yOverhang = (iB.height - cB.height) / 2;
    // snap to left and right
    if (iB.left > cB.left) {
      newCrop.x = xOverhang;
    } else if (iB.right < cB.right) {
      newCrop.x = -xOverhang;
    }
    // snap to top and bottom
    if (iB.top > cB.top) {
      newCrop.y = yOverhang;
    } else if (iB.bottom < cB.bottom) {
      newCrop.y = -yOverhang;
    }
    setCrop(newCrop);
  };

  const reframeImg = ({ offset: [zoom] }) => {
    if (zoom < 1) {
      setCrop(initCrop);
      setFramerMotionDrag('x');
    }
  };

  useGesture(
    {
      onDrag: ({ offset: [dx, dy] }) => {
        if (crop.scale > 1) {
          setCrop((prevVal) => ({
            ...prevVal,
            x: dx,
            y: dy,
            b: null,
            r: null,
          }));
        }
      },
      onDragEnd: () => adjustImgBoundary(),
      onPinch: ({ offset: [z] }) => {
        if (framerMotionDrag) {
          setFramerMotionDrag(false);
        }

        setCrop((prevVal) => ({
          ...prevVal,
          b: null,
          r: null,
          scale: z < 1 ? 1 : z,
        }));
      },
      onPinchEnd: (props) =>
        new Promise((resolve) => {
          resolve(adjustImgBoundary());
        }).then(() => {
          reframeImg(props);
        }),
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

  return {
    crop,
    setRef,
  };
}
