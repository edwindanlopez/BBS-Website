import React from "react";
import "twin.macro";

export default function LayoutWrapper({ children }) {
  return (
    <div
      id='layout-wrapper'
      tw='
      w-11/12
      max-w-lg
      mx-auto
      sm:mx-auto
      sm:max-w-screen-sm
      mb-16
    '
    >
      {children}
    </div>
  );
}
