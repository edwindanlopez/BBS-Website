import { useState, useEffect } from 'react';

const useWindowDimensions = () => {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    typeof window !== 'undefined' && getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    if (window) {
      window.addEventListener('resize', handleResize);
    }

    // clean up
    return () => {
      if (window) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
