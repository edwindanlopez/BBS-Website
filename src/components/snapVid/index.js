import React from "react";
import { theme } from "twin.macro";

import Button from "../lib/Button";

export default function Snapavid() {
  return (
    <>
      <h2 tw='mb-4'>Snap a Video</h2>
      <div tw='mx-auto'>
        <div
          className='top-section'
          tw='bg-mildgray h-32 rounded-t-md p-4 flex justify-center items-center'
        >
          <p tw='text-white max-w-sm text-center leading-6'>
            Know the problem, but not sure of the solution you’re looking for?
          </p>
        </div>
        <div
          className='btm-section'
          tw='bg-softGreen h-64 rounded-b-md p-4 flex flex-wrap justify-center items-center'
        >
          <p tw='text-white max-w-sm text-center leading-6'>
            Shoot us a video showing us the space and we’ll help identify a
            couple of possibilities to help get you started, regardless of who
            you decide to go with.
          </p>
          <Button id='hero-btn' type='button' variant='secondary'>
            <svg xmlns='http://www.w3.org/2000/svg' width='31.6' height='17'>
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
            <span tw='inline-block pl-3 font-sans font-semibold'>Snap Vid</span>
          </Button>
        </div>
      </div>
    </>
  );
}
