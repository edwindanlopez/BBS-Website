import React from "react";
const Video = ({ videoSrcURL, ...props }) => (
  <div className='video'>
    <video src={videoSrcURL} {...props} />
  </div>
);
export default Video;
