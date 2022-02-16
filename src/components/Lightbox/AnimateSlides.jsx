import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import 'twin.macro';

export default function AnimateSlides({
  direction,
  slide,
  paginate,
  framerMotionDrag,
  children,
}) {
  const windowWidth = window.screen.width;

  // framer motion variants
  const variants = {
    enter: (direct) => ({
      x: direct > 0 ? windowWidth : windowWidth * -1,
      opacity: 0,
    }),
    center: {
      zIndex: 30,
      x: 0,
      opacity: 1,
    },
    exit: (direct) => ({
      x: direct > 0 ? windowWidth * -1 : windowWidth,
      opacity: 0,
    }),
  };

  // framer motion settings
  const swipeConfidenceThreshold = 1000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        layout="position"
        key={slide}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
            duration: 0.8,
          },
          opacity: { duration: 0.3 },
        }}
        drag={framerMotionDrag}
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
        tw="w-screen flex flex-col justify-end"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

AnimateSlides.propTypes = {
  direction: PropTypes.number,
  slide: PropTypes.number,
  paginate: PropTypes.func,
  framerMotionDrag: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  children: PropTypes.element,
};

AnimateSlides.defaultProps = {
  direction: 0,
  slide: 0,
  paginate: () => {},
  framerMotionDrag: 'x',
  children: undefined,
};
