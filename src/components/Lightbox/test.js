import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const ImageWrapper = styled.div`
  background: var(--color-primary-01);
  height: 100%;
  position: relative;
`;

const Image = styled(motion.img)`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const ImageGallery = ({ productImages }) => {
  const [[current, direction], setProperties] = useState([0, 0]);

  const paginate = (newDirection) => {
    if (newDirection > 0) {
      if (current < productImages.length - 1) {
        setProperties([current + 1, newDirection]);
      }
    } else if (newDirection < 0) {
      if (current > 0) {
        setProperties([current - 1, newDirection]);
      }
    }
  };

  const Image = styled(Img)`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  `;

  return (
    <ImageWrapper>
      <AnimatePresence initial={false} custom={direction} exitBeforeEnter>
        <motion.div
          key={current}
          style={{ width: "100%", height: "100%" }}
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
          <Image
            fluid={productImages[current].localFile.childImageSharp.fluid}
            alt={productImages[current].localFile.name}
          />
        </motion.div>
      </AnimatePresence>
    </ImageWrapper>
  );
};
