import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import 'twin.macro';

export default function MotionWrapper({
  direction,
  slide,
  paginate,
  framerMotionDrag,
  children,
}) {
  // framer motion variants
  const variants = React.useMemo(
    () => ({
      enter: (direct) => ({
        x: direct > 0 ? 1000 : -1000,
        opacity: 1,
      }),
      center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
      },
      exit: (direct) => ({
        zIndex: 1,
        x: direct < 0 ? 1500 : -1500,
        opacity: 0,
      }),
    }),
    []
  );

  const swipeConfidenceThreshold = 1000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  return (
    <AnimatePresence initial={false} custom={direction}>
      {typeof slide === 'number' && (
        <motion.div
          className="framer-motion-wrapper"
          key={slide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30, duration: 3 },
          }}
          drag={framerMotionDrag}
          dragConstraints={{ left: 1000, right: 1000 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          tw="w-screen h-[50vh] md:(w-[70vw]) xl:(w-[50vw] h-[60vh]) fixed m-auto top-0 bottom-0 right-0 left-0"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

MotionWrapper.displayName = 'Slides';

MotionWrapper.propTypes = {
  direction: PropTypes.number,
  slide: PropTypes.number,
  paginate: PropTypes.func,
  framerMotionDrag: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  children: PropTypes.element,
};

MotionWrapper.defaultProps = {
  direction: 0,
  slide: 0,
  paginate: () => {},
  framerMotionDrag: 'x',
  children: undefined,
};
