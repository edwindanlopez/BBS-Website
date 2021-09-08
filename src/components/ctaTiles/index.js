import React from "react";
import "twin.macro";

export default function CtaTiles() {
  return (
    <>
      <div className='vertical-tiles' tw='flex content-between space-x-3'>
        <div tw='w-full h-40 bg-softGreen rounded-md flex justify-center items-center'>
          <h3 tw='text-white'>About BBS</h3>
        </div>
        <div tw='w-full h-40 bg-mildgray rounded-md flex justify-center items-center'>
          <h3 tw='text-white'>Contact Us</h3>
        </div>
      </div>
      <div tw='w-full h-40 mt-3 bg-neutral rounded-md flex justify-center items-center'>
        <h3 tw='text-white'>Another tile title here</h3>
      </div>
    </>
  );
}
