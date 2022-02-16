import React, { useState, useEffect, useContext, useMemo } from 'react';
import { wrap } from 'popmotion';
import 'twin.macro';

import { DialogContent as ReachDialogContent } from '@reach/dialog';
import LightboxContext from './LightboxContext';
import DialogControls from './DialogControls';
import AnimateSlides from './AnimateSlides';
import ZoomPanContainer from './ZoomPanContainer';
import Video from '../Video';

export default function DialogContent() {
  const [framerMotionDrag, setFramerMotionDrag] = useState('x');
  const [lightboxAsset, setLightboxAsset] = useState({
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

  const { imgNode, setImgNode, direction, imageSlides } =
    useContext(LightboxContext);

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
    if (imageSlides[slide].childImageSharp) {
      setLightboxAsset({
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
      setLightboxAsset({
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
        backgroundColor: '#101011',
        width: 'unset',
        margin: 'auto',
      }}
      tw="p-[0px!important] relative flex justify-end items-center flex-row w-screen h-screen md:(w-[75vw!important] h-auto) overflow-hidden"
    >
      <>
        <DialogControls paginate={paginate} />
        <AnimateSlides
          direction={direction}
          slide={slide}
          paginate={paginate}
          framerMotionDrag={framerMotionDrag}
        >
          <ZoomPanContainer setFramerMotionDrag={setFramerMotionDrag}>
            <div tw="w-screen md:w-[75vw] flex justify-center items-center overflow-hidden">
              {lightboxAsset.img.src && lightboxAsset.img.srcSet ? (
                <img
                  src={lightboxAsset.img.src}
                  alt={lightboxAsset.img.name}
                  tw="object-contain mx-auto max-h-[100vh] lg:h-[90vh]"
                />
              ) : lightboxAsset.video ? (
                <Video
                  videoSrcURL={lightboxAsset.video.vidUrl}
                  autoPlay
                  tw="object-contain mx-auto max-h-[100vh] lg:h-[90vh]"
                />
              ) : null}
            </div>
          </ZoomPanContainer>
        </AnimateSlides>
      </>
    </ReachDialogContent>
  );
}
