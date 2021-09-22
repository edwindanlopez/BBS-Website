import React from "react";
import "twin.macro";

export default function PageLayoutWrapper({ children, ...props }) {
  return (
    <div
      id='page-layout-wrapper'
      tw='w-11/12 max-w-lg mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl'
      {...props}
    >
      {children}
    </div>
  );
}
