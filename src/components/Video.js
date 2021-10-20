import React from "react";

const Video = ({ videoSrcURL, videoTitle, ...props }) => (
  <div className='video'>
    <video muted src={videoSrcURL} {...props} preload='metadata' playsInline />
  </div>
);
export default Video;
