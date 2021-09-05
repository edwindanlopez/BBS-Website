import React from "react";
import "twin.macro";

export default function Project() {
  return (
    <div tw='flex overflow-x-scroll'>
      <div tw='w-32 mr-4'>
        <div tw='h-32 w-32 bg-neutral rounded-md' />
        <h3 tw='w-full text-left mt-2.5'>Project name 1</h3>
      </div>
      <div tw='w-32 mr-4'>
        <div tw='h-32 w-32 bg-neutral rounded-md' />
        <h3 tw='w-full text-left mt-2.5'>Project name 2</h3>
      </div>
      <div tw='w-32 mr-4'>
        <div tw='h-32 w-32 bg-neutral rounded-md' />
        <h3 tw='w-full text-left mt-2.5'>Project name 3</h3>
      </div>
    </div>
  );
}
