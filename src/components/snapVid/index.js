import React from "react";
import { theme } from "twin.macro";

import Button from "../lib/Button";
import PageLayoutWrapper from "../layoutWrappers/PageLayoutWrapper";

export default function Snapavid() {
  return (
    <PageLayoutWrapper tw='md:w-full md:max-w-full 2xl:(w-11/12 max-w-screen-2xl)'>
      <div tw='grid grid-cols-1 gap-0 md:grid-cols-2 md:height[26rem]'>
        <div className='snap-video-wrapper' tw='hidden md:block'>
          <div
            className='top-section'
            tw='h-full bg-mildgray flex flex-wrap justify-center items-center p-8'
          >
            <h2 tw='mb-4 text-center text-white w-full'>This is on the LEFT</h2>
          </div>
        </div>
        <PageLayoutWrapper tw='md:w-full md:max-w-full'>
          <div className='snap-video-wrapper' tw='h-full'>
            <div
              className='top-section'
              tw='bg-mildgray rounded-t-md flex flex-wrap justify-center items-center p-6 sm:p-8 md:rounded-none'
            >
              <h2 tw='mb-4 text-center text-white w-full'>Snap a Video</h2>
              <p tw='text-white max-w-sm text-center leading-6'>
                Know the problem, but not sure of the solution you’re looking
                for?
              </p>
            </div>
            <div
              className='btm-section'
              tw='height[calc(26rem*.75)] bg-softGreen rounded-b-md flex flex-wrap justify-center items-center md:rounded-none p-6 sm:p-8'
            >
              <div tw='h-52 flex flex-wrap justify-center items-center'>
                <p tw='text-white max-w-sm text-center leading-6'>
                  Shoot us a video showing us the space and we’ll help identify
                  a couple of possibilities to help get you started, regardless
                  of who you decide to go with.
                </p>
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
                      fill={theme`colors.mildgray`}
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
              </div>
            </div>
          </div>
        </PageLayoutWrapper>
      </div>
    </PageLayoutWrapper>
  );
}
