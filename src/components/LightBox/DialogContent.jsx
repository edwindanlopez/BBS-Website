import React, { useState, useEffect, useContext, useMemo, useRef } from 'react';
import { wrap } from 'popmotion';
import 'twin.macro';

import { DialogContent as ReachDialogContent } from '@reach/dialog';
import LightBoxContext from './LightBoxContext';
import DialogControls from './DialogControls';
import Slides from './Slides';
import ZoomPanContainer from './ZoomPanContainer';
import Video from '../Video';

export default function DialogContent() {
  const [containerBounds, setContainerBounds] = useState();
  const [framerMotionDrag, setFramerMotionDrag] = useState('x');
  const [LightBoxAsset, setLightBoxAsset] = useState({
    img: {
      src: '',
      srcSet: '',
      name: '',
    },
    video: {
      vidUrl: '',
      name: '',
    },
  });
  const containerBoundsRef = useRef();

  const { imgNode, setImgNode, direction, imageSlides } =
    useContext(LightBoxContext);

  const slide = useMemo(
    () => imageSlides.findIndex((el) => el.name === imgNode.name),
    [imgNode, imageSlides]
  );

  const paginate = (newDirection) => {
    // cycle images indefinitely by wrapping array index back at the beginning
    const newImageIndex = wrap(0, imageSlides.length, slide + newDirection);
    const newImageNode = imageSlides[newImageIndex];
    setImgNode([newImageNode, newDirection]);
  };

  useEffect(() => {
    if (containerBoundsRef) {
      setContainerBounds(containerBoundsRef.current.getBoundingClientRect());
    }
  }, []);

  useEffect(() => {
    if (imageSlides[slide].childImageSharp) {
      setLightBoxAsset({
        img: {
          src: imageSlides[slide].childImageSharp.gatsbyImageData.images
            .fallback.src,
          srcSet:
            imageSlides[slide].childImageSharp.gatsbyImageData.images.fallback
              .srcSet,
          name: imageSlides[slide].name,
        },
        video: {
          vidUrl: null,
          name: null,
        },
      });
    } else if (imageSlides[slide].video) {
      setLightBoxAsset({
        img: {
          src: null,
          srcSet: null,
          name: null,
        },
        video: {
          vidUrl: imageSlides[slide].video,
          name: imageSlides[slide].name,
        },
      });
    } else {
      throw new Error(
        'Asset found in imageSlides was neither an image or video'
      );
    }
  }, [slide, imgNode, imageSlides]);

  return (
    <ReachDialogContent
      aria-label="gallery image"
      className="dialog-content"
      style={{
        backgroundColor: 'unset',
        width: 'unset',
        margin: 'auto',
        zIndex: 40,
      }}
      tw="w-screen md:(w-[75vw!important]) p-[0px!important] flex flex-row justify-center overflow-hidden "
    >
      <>
        <Slides
          ref={containerBoundsRef}
          direction={direction}
          slide={slide}
          paginate={paginate}
          framerMotionDrag={framerMotionDrag}
        >
          <ZoomPanContainer
            framerMotionDrag={framerMotionDrag}
            setFramerMotionDrag={setFramerMotionDrag}
            containerBounds={containerBounds}
          >
            {LightBoxAsset.img.src && LightBoxAsset.img.srcSet ? (
              <img
                src={LightBoxAsset.img.src}
                alt={LightBoxAsset.img.name}
                tw="w-auto h-auto max-h-screen"
              />
            ) : LightBoxAsset.video ? (
              <Video
                videoSrcURL={LightBoxAsset.video.vidUrl}
                autoPlay
                tw="w-auto h-full max-h-screen"
              />
            ) : null}
          </ZoomPanContainer>
        </Slides>
        <DialogControls paginate={paginate} />
      </>
    </ReachDialogContent>
  );
}
