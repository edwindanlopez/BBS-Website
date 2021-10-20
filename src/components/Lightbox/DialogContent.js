import React, { useContext } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import "twin.macro";

import { DialogContext } from "./DialogContext";
import PaginateButton from "./PaginateButton";
import { DialogContent as ReachDialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import Video from "../../components/Video";

export default function DialogContent() {
  // pull in dialog and image slide values from react context
  const { imgNode, direction, setImgNode, setShowDialog, imageSlides } =
    useContext(DialogContext);

  const page = imageSlides.findIndex((el) => el.name === imgNode.name);

  const paginate = (newDirection) => {
    // cycle images indefinitely by wrapping array index back at the beginning
    const newImageIndex = wrap(0, imageSlides.length, page + newDirection);
    const newImageNode = imageSlides[newImageIndex];
    setImgNode([newImageNode, newDirection]);
  };

  // framer motion variants
  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  // framer motion helpers
  const swipeConfidenceThreshold = 10000;

  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <ReachDialogContent
      aria-label='gallery image'
      className='dialog-content'
      style={{
        background: "unset",
        width: "100%",
        padding: "unset",
        margin: "auto auto",
      }}
    >
      <div
        className='top-area'
        tw='absolute z-10 top-0 w-full flex justify-end items-center h-16'
      >
        <CloseButton onClick={() => setShowDialog(false)} />
      </div>
      <div
        className='img-overlay-wrapper'
        tw='w-full flex justify-center items-center'
      >
        <span
          aria-hidden
          className='slider-btn-container'
          tw='absolute z-10 w-full flex justify-between items-center h-20'
        >
          <PaginateButton
            className='left-arrow-button'
            onClick={() => paginate(-1)}
          />
          <PaginateButton
            className='right-arrow-button'
            onClick={() => paginate(1)}
          />
        </span>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            className='framer-motion-wrapper'
            key={page}
            custom={direction}
            variants={variants}
            initial='enter'
            animate='center'
            // exit='exit'
            transition={{
              x: {
                type: "spring",
                stiffness: 380,
                damping: 38,
              },
              opacity: { duration: 0.2 },
            }}
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            tw='w-screen h-screen lg:height[75vh]'
          >
            {imgNode.childImageSharp ? (
              <GatsbyImage
                image={imageSlides[page].childImageSharp.gatsbyImageData}
                alt={imageSlides[page].name}
                // style - Spread into the default styles of the wrapper element
                style={{
                  height: "100%",
                  width: "100%",
                }}
                // imgStyle- Spread into the default styles of the actual img element
                imgStyle={{
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
            ) : (
              <Video
                videoSrcURL={imgNode.video}
                autoPlay
                tw='h-screen mx-auto lg:height[75vh]'
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </ReachDialogContent>
  );
}

const CloseButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className='close-button'
    tw='text-white mr-4 p-2 rounded-md hover:bg-white hover:bg-opacity-20'
  >
    <span aria-hidden>
      <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15'>
        <path
          d='M15 2.727 12.273 0 7.5 4.773 2.727 0 0 2.727 4.773 7.5 0 12.273 2.727 15 7.5 10.227 12.273 15 15 12.273 10.227 7.5Z'
          fill='#fff'
        />
      </svg>
    </span>
  </button>
);
