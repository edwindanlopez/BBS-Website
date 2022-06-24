import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { theme } from 'twin.macro';

import Button from './shared/Button';
import useWindowDimensions from './shared/useWindowDimensions';

export default function TopHero() {
  const { width } = useWindowDimensions();

  return (
    <div
      id="top-hero"
      tw="flex items-center h-[27rem]"
      style={{ zIndex: '-1' }}
    >
      <div className="cta-items" tw="absolute w-full mt-[-7rem]">
        {/* <div classNmae='break'></div> */}
        <div tw="flex flex-wrap justify-center w-full max-w-md mx-auto mt-20">
          <div id="main-header" tw="w-11/12 mb-4">
            <span>
              <h1 tw="text-center text-dark text-[2.5rem] leading-[3rem] lg:(fontSize[2.5rem] lineHeight[3.15rem])">
                Bring your space
              </h1>
              <h1 tw="text-center text-dark text-[2.5rem] leading-[3rem] lg:(fontSize[2.5rem] lineHeight[3.15rem])">
                to the next level
              </h1>
            </span>
          </div>
          <Link to="/contact/">
            <Button variant="primary" id="hero-btn" type="button" tw="mt-4">
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27.163"
                  height="25.41"
                >
                  <g data-name="Group 9" fill={theme`colors.softGreen`}>
                    <path
                      data-name="Path 26"
                      d="M0 10.953l10.32 4.089L25.167 0zm12.17 5.014l10.807 6.669L27.163.73z"
                    />
                    <path
                      data-name="Path 27"
                      d="M11.293 25.411l3.8-5.452-3.8-2.337z"
                    />
                  </g>
                </svg>
                <span tw="inline-block pl-3 font-sans font-semibold">
                  Request an estimate
                </span>
              </>
            </Button>
          </Link>
        </div>
      </div>
      {width >= 992 ? (
        <div
          className="video-wrapper"
          tw="w-full h-full overflow-hidden"
          style={{ zIndex: '-1' }}
        >
          <div
            className="top-section"
            tw="relative h-full flex bg-beige flex-wrap justify-center items-center overflow-hidden"
          >
            <div
              className="vid-color-overlay"
              tw="absolute z-10 h-full w-full opacity-70 backgroundColor[#e5ecff] mix-blend-overlay"
            />
            <video
              muted
              autoPlay
              playsInline
              tw="w-full h-full opacity-100 object-cover object-center md:block md:height[29rem]"
            >
              <source
                src="https://res.cloudinary.com/edwindanlopez/video/upload/v1634328885/BBS/Website-Assets/Portfolio-Videos/top-hero-video-empty-room-sm_w2lqqy.mp4"
                type="video/mp4"
              />
              {/* Fallback image if video can't load */}
              <StaticImage
                alt="BBS Hero image of modern open space with wooden floor"
                src="../images/top-hero-mobile-fallback.jpg"
                tw="w-full h-full object-cover object-center transform"
              />
              <p>Your browser doesn&apos;t support HTML5 video.</p>
            </video>
          </div>
        </div>
      ) : (
        <div
          id="hero-img"
          tw="w-full h-full overflow-hidden"
          style={{ zIndex: '-1' }}
        >
          <StaticImage
            alt="BBS Hero image of beautiful refurnished white kitchen cabinet"
            src="../images/top-hero-mobile-fallback.jpg"
            tw="w-full h-full object-cover object-center transform"
          />
        </div>
      )}
    </div>
  );
}
