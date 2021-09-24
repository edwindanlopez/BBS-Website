import React from "react";
import "twin.macro";

export default function WorkDetailPageWrapper({ children, ...props }) {
  return (
    <div
      tw='mx-auto w-full h-full flex flex-wrap sticky bottom-0 md:self-end xl:max-w-screen-xl 2xl:max-w-screen-2xl'
      id='work-detail-page-wrapper'
      {...props}
    >
      {children}
    </div>
  );
}
