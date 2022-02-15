import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

export default function AnimateSlides({
  direction,
  page,
  paginate,
  framerMotionDrag,
  children,
}) {
  // framer motion variants
  const variants = {
    enter: (direct) => ({
      x: direct > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direct) => ({
      x: direct < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  // framer motion settings
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        key={page}
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
            duration: 0.5,
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
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

AnimateSlides.propTypes = {
  direction: PropTypes.number,
  page: PropTypes.number,
  paginate: PropTypes.func,
  framerMotionDrag: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  children: PropTypes.element,
};

AnimateSlides.defaultProps = {
  direction: 1,
  page: 0,
  paginate: () => {},
  framerMotionDrag: 'x',
  children: undefined,
};
