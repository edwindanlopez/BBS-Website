import React, { useState, useContext, useEffect, useRef } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import "twin.macro";

import { DialogContext } from "./DialogContext";
import PaginateButton from "./PaginateButton";
import { DialogContent as ReachDialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

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

export default function DialogContent() {
  // pull in dialog and image slide values from react context
  const { imgNode, direction, setImgNode, setShowDialog, imageSlides } =
    useContext(DialogContext);

  const page = imageSlides.indexOf(imgNode);

  const paginate = (newDirection) => {
    // cycle images indefinitely by wrapping array index back at the beginning
    const newImageIndex = wrap(0, imageSlides.length, page + newDirection);
    const newImageNode = imageSlides[newImageIndex];

    setImgNode([newImageNode, newDirection]);
  };

  return (
    <>
      <ReachDialogContent
        aria-label='gallery image'
        className='dialog-content'
        style={{
          background: "unset",
          padding: "unset",
          width: "100vw",
          margin: "auto auto",
        }}
      >
        <div
          className='top-area'
          tw='relative w-full flex justify-end items-center h-16'
        >
          <CloseButton onClick={() => setShowDialog(false)} />
        </div>
        <div className='img-overlay-wrapper' tw='w-full flex items-center'>
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
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
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
            >
              <GatsbyImage
                image={imageSlides[page].gatsbyImageData}
                alt='Temp Alt tag'
                style={{
                  maxHeight: "100vh",
                }}
                imgStyle={{
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div
          className='caption'
          tw='w-full flex justify-center items-center mt-2'
        >
          <p tw='text-white m-6'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            imperdiet arcu rutrum lorem mollis, non laoreet diam pulvinar.
            Maecenas.
          </p>
        </div>
      </ReachDialogContent>
    </>
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
