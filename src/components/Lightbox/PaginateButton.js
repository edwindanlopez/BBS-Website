import React from "react";
import "twin.macro";

export default function PaginateButton({ direction, className, onClick }) {
  return (
    <div className={direction}>
      <button
        className={className}
        onClick={onClick}
        tw='text-white ml-4 p-4 rounded-md hover:bg-white hover:bg-opacity-20'
      >
        {direction === "previous" ? <LeftArrowIcon /> : <RightArrowIcon />}
      </button>
    </div>
  );
}

const LeftArrowIcon = () => (
  <svg
    className='left-arrow-icon'
    xmlns='http://www.w3.org/2000/svg'
    width='18'
    height='28'
    tw='opacity-50'
  >
    <path d='M0 14 14 0l4 4.486L8.485 14 18 23.513 14 28 0 14Z' fill='#fff' />
  </svg>
);

const RightArrowIcon = () => (
  <svg
    className='right-arrow-icon'
    xmlns='http://www.w3.org/2000/svg'
    width='18'
    height='28'
    tw='opacity-50'
  >
    <path d='M18 14 4 0 0 4.486 9.515 14 0 23.513 4 28l14-14Z' fill='#fff' />
  </svg>
);
