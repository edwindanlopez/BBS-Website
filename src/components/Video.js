import React from "react";

const Video = ({ videoSrcURL, videoTitle, ...props }) => (
  <div className='video'>
    <video
      muted
      src={`${videoSrcURL}#t=0.001`}
      {...props}
      preload='metadata'
      playsInline
    />
  </div>
);
export default Video;
