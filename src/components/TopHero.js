import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { theme } from "twin.macro";

import Button from "./lib/Button";

export default function TopHero() {
  return (
    <div id='top-hero' tw='flex items-center h-96' style={{ zIndex: "-1" }}>
      <div className='cta-items' tw='absolute w-full'>
        {/* <div classNmae='break'></div> */}
        <div tw='flex flex-wrap justify-center w-full max-w-md mx-auto mt-20'>
          <div id='main-header' tw='w-11/12 mb-4'>
            <h1 tw='text-center'>Bring your space to the next level</h1>
          </div>
          <Link to={`/contact/`}>
            <Button variant='primary' id='hero-btn' type='button' tw='mt-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='27.163'
                height='25.41'
              >
                <g data-name='Group 9' fill={theme`colors.softGreen`}>
                  <path
                    data-name='Path 26'
                    d='M0 10.953l10.32 4.089L25.167 0zm12.17 5.014l10.807 6.669L27.163.73z'
                  />
                  <path
                    data-name='Path 27'
                    d='M11.293 25.411l3.8-5.452-3.8-2.337z'
                  />
                </g>
              </svg>
              <span tw='inline-block pl-3 font-sans font-semibold'>
                Request an estimate
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <div
        className='video-wrapper'
        tw='w-full h-full overflow-hidden'
        style={{ zIndex: "-1" }}
      >
        <div
          className='top-section'
          tw='relative h-full flex bg-beige flex-wrap justify-center items-center overflow-hidden'
        >
          <div
            className='vid-color-overlay'
            tw='absolute z-10 h-full w-full opacity-70 backgroundColor[#e5ecff] mix-blend-overlay'
          />
          <video
            autoPlay
            tw='w-full h-full opacity-100 object-cover object-center hidden md:block md:height[29rem]'
          >
            <source
              src='https://daniellopezdesign.nyc3.digitaloceanspaces.com/BBS/videos/top-hero-video-empty-room.mp4'
              type='video/mp4'
            />
            <p>Your browser doesn't support HTML5 video.</p>
          </video>
        </div>
      </div>
      {/* <div
        id='hero-img'
        tw='w-full h-full overflow-hidden'
        style={{ zIndex: "-1" }}
      >
        <StaticImage
          alt='BBS Hero image of beautiful refurnished white kitchen cabinet'
          src='../images/bbs-top-hero-image.jpg'
          tw='w-full h-full object-cover object-center transform scale-150'
        />
      </div> */}
    </div>
  );
}
