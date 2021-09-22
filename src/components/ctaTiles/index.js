import React from "react";
import "twin.macro";

import ActivityMap from "../ActivityMap";
import PageLayoutWrapper from "../layoutWrappers/PageLayoutWrapper";

export default function CtaTiles() {
  return (
    <PageLayoutWrapper>
      <ActivityMap />
      <div className='vertical-tiles' tw='flex content-between space-x-3'>
        <div tw='w-full h-40 bg-softGreen rounded-md flex justify-center items-center'>
          <h3 tw='text-white'>About BBS</h3>
        </div>
        <div tw='w-full h-40 bg-mildgray rounded-md flex justify-center items-center'>
          <h3 tw='text-white'>Contact Us</h3>
        </div>
      </div>
    </PageLayoutWrapper>
  );
}
