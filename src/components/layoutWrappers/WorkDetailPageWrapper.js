import React from "react";
import "twin.macro";

export default function WorkDetailPageWrapper({ children }) {
  return (
    <div tw='md:w-11/12 md:mx-auto' id='work-detail-page-wrapper'>
      {children}
    </div>
  );
}
