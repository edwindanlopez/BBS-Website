import React, { useState, useContext } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import "twin.macro";

import { ImageSlidesContext } from "../../pages/work/workDetailPageTemplate";
import PaginateButton from "./PaginateButton";
import { DialogContent as ReachDialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

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

const swipeConfidenceThreshold = 10000;

const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function DialogContent({ node, close }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [slides] = useContext(ImageSlidesContext);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const imageIndex = wrap(0, slides.length, page);
  const image = getImage(node.childImageSharp.gatsbyImageData);
  // const Component = React.forwardRef((props, ref) => <GatsbyImage ref={ref} />);
  // const MotionGatsbyImage = motion(Component);

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
          <button
            className='close-button'
            onClick={close}
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
        </div>
        <div className='img-overlay-wrapper' tw='w-full flex items-center'>
          <span
            aria-hidden
            className='slider-btn-container'
            tw='absolute z-10 w-full flex justify-between items-center h-20'
          >
            <PaginateButton
              direction='previous'
              className='left-arrow-button'
              onClick={() => paginate(-1)}
            />
            <PaginateButton
              direction='next'
              className='right-arrow-button'
              onClick={() => paginate(1)}
            />
          </span>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={image}
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
                image={slides[imageIndex].gatsbyImageData}
                alt={node.name}
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
