import React from "react";
import { theme } from "twin.macro";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

import Button from "../lib/Button";
import PageLayoutWrapper from "../layoutWrappers/PageLayoutWrapper";
import questionMarkTransparent from "../../images/question-mark-transparent.svg";

export default function Snapavid() {
  return (
    <PageLayoutWrapper tw='md:w-full md:max-w-full 2xl:(w-11/12 max-w-screen-2xl)'>
      <div tw='grid grid-cols-1 gap-0 md:grid-cols-2 md:height[26rem]'>
        <div className='image-wrapper' tw='hidden md:block'>
          <div
            className='top-section'
            tw='relative h-full flex bg-dark flex-wrap justify-center items-center overflow-hidden 2xl:(rounded-tl-md rounded-bl-md)'
          >
            <img
              tw='absolute z-10'
              src={questionMarkTransparent}
              alt='question-mark-transparent-icon'
            />
            <div
              className='img-color-overlay'
              tw='absolute z-10 h-full w-full opacity-80 backgroundColor[#d4cdc8] mix-blend-soft-light'
            />
            <StaticImage
              tw='w-full h-full opacity-80 object-cover object-center hidden md:block md:height[29rem]'
              alt='wooden-floor-in-need-of-repair'
              src='../../images/feat-snap-vid-image.jpg'
            />
          </div>
        </div>
        <PageLayoutWrapper tw='md:w-full md:max-w-full'>
          <div className='snap-video-wrapper' tw='h-full'>
            <div
              className='top-section'
              tw='backgroundColor[#3c3b3b] rounded-t-md flex flex-wrap justify-center items-center p-6 sm:p-8 md:rounded-none 2xl:rounded-tr-md'
            >
              <h2 tw='mb-4 text-center text-white w-full'>Snap a Video</h2>
              <p tw='text-white max-w-sm text-center leading-6'>
                Know the problem, but not sure of the solution you’re looking
                for?
              </p>
            </div>
            <div
              className='btm-section'
              tw='height[calc(26rem*.75)] bg-softGreen rounded-b-md flex flex-wrap justify-center items-center md:rounded-none p-6 sm:p-8 2xl:rounded-br-md'
            >
              <div tw='h-52 flex flex-wrap justify-center items-center'>
                <p tw='text-white w-3/4 max-w-sm text-center leading-6'>
                  Shoot us a video showing us the space and we’ll help identify
                  a couple of possibilities to help get you started.
                </p>
                <Link to={`/contact/`}>
                  <Button
                    id='hero-btn'
                    type='button'
                    variant='secondary'
                    tw='w-3/4'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='31.6'
                      height='17'
                    >
                      <g
                        data-name='Group 5'
                        transform='translate(-3 -16)'
                        fill={theme`colors.mildGray`}
                      >
                        <rect
                          data-name='Rectangle 34'
                          width='20'
                          height='17'
                          rx='3'
                          transform='translate(3 16)'
                        />
                        <path
                          data-name='Path 24'
                          d='M33.507 17.093l-7.65 4.371v6.557l7.65 4.372H34.6v-15.3z'
                        />
                      </g>
                    </svg>
                    <span tw='inline-block pl-3 font-sans font-semibold'>
                      Snap Vid
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </PageLayoutWrapper>
      </div>
    </PageLayoutWrapper>
  );
}
