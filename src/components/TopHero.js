import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { theme } from "twin.macro";

import Logo from "./Logo";
import Button from "../lib/Button";

export default function TopHero() {
  return (
    <div tw='relative flex h-96'>
      <div className='hero-items' tw='absolute z-10 w-full '>
        <Logo />
        {/* <div classNmae='break'></div> */}
        <div tw='flex flex-wrap justify-center w-full max-w-md h-52 mx-auto mt-20'>
          <div id='main-header' tw='w-11/12 '>
            <h1 tw='text-center'>Bring your space to the next level</h1>
          </div>
          <Button variant='primary' id='hero-btn' type='button'>
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
        </div>
      </div>
      <div id='hero-img' tw='w-full overflow-hidden'>
        <StaticImage
          alt='BBS Hero image of beautiful refurnished white kitchen cabinet'
          src='../images/BBS-Top-Hero-Image.jpg'
          tw='w-full h-full object-cover object-center transform scale-150'
        />
      </div>
    </div>
  );
}
