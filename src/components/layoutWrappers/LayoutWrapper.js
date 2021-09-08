import React from "react";
import "twin.macro";

export default function LayoutWrapper({ children }) {
  return (
    <div id='layout-wrapper' tw=''>
      {children}
    </div>
  );
}
