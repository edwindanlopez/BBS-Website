import React from 'react';
import PropTypes from 'prop-types';

function Video({ videoSrcURL, videoTitle, ...props }) {
  return (
    <video
      muted
      src={`${videoSrcURL}#t=0.001`}
      {...props}
      preload="metadata"
      playsInline
    />
  );
}
export default Video;

Video.propTypes = {
  videoSrcURL: PropTypes.string,
  videoTitle: PropTypes.string,
};

Video.defaultProps = {
  videoSrcURL: '',
  videoTitle: '',
};
