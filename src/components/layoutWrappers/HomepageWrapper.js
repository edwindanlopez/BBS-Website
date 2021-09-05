import React from "react";
import tw from "twin.macro";

export default function HomepageWrapper({ children }) {
  return (
    <div
      id='homepage-wrapper'
      tw='
      w-11/12
      max-w-lg
      mx-auto
      sm:mx-auto
      sm:max-w-screen-sm
      pb-4
      pt-14
    '
    >
      {children}
    </div>
  );
}
