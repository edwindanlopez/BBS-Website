import React, { useState, useEffect, useContext } from 'react';
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

  const page = imageSlides.findIndex((el) => el.name === imgNode.name);

  const paginate = (newDirection) => {
    // cycle images indefinitely by wrapping array index back at the beginning
    const newImageIndex = wrap(0, imageSlides.length, page + newDirection);
    const newImageNode = imageSlides[newImageIndex];
    setImgNode([newImageNode, newDirection]);
  };

  useEffect(() => {
    if (imageSlides[page].childImageSharp) {
      setLightboxAsset({
        img: {
          src: imageSlides[page].childImageSharp.gatsbyImageData.images.fallback
            .src,
          srcSet:
            imageSlides[page].childImageSharp.gatsbyImageData.images.fallback
              .srcSet,
          name: imageSlides[page].name,
        },
        video: {
          vidUrl: null,
          name: null,
        },
      });
    } else if (imageSlides[page].video) {
      setLightboxAsset({
        img: {
          src: null,
          srcSet: null,
          name: null,
        },
        video: {
          vidUrl: imageSlides[page].video,
          name: imageSlides[page].name,
        },
      });
    } else {
      throw new Error(
        'Asset found in imageSlides was neither an image or video'
      );
    }
  }, [page, imgNode, imageSlides]);

  return (
    <ReachDialogContent
      aria-label="gallery image"
      className="dialog-content"
      style={{
        background: 'unset',
        padding: 'unset',
        margin: 'inherit',
        width: '100vw',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <>
        <DialogControls paginate={paginate} />
        <AnimateSlides
          direction={direction}
          page={page}
          paginate={paginate}
          framerMotionDrag={framerMotionDrag}
        >
          <ZoomPanContainer setFramerMotionDrag={setFramerMotionDrag}>
            {lightboxAsset.img.src && lightboxAsset.img.srcSet ? (
              <div tw="w-screen flex justify-end items-center md:justify-center">
                <img
                  src={lightboxAsset.img.src}
                  alt={lightboxAsset.img.name}
                  tw="md:w-[75vw] lg:w-[50vw] 2xl:w-[50rem]"
                />
              </div>
            ) : lightboxAsset.video ? (
              <div tw="w-screen flex justify-center items-center">
                <Video
                  videoSrcURL={lightboxAsset.video.vidUrl}
                  autoPlay
                  tw="h-screen mx-auto lg:height[75vh]"
                />
              </div>
            ) : null}
          </ZoomPanContainer>
        </AnimateSlides>
      </>
    </ReachDialogContent>
  );
}
