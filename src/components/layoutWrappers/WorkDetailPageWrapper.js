import React from "react";
import tw from "twin.macro";

const StyledWrapper = tw.div`
  sm:w-11/12
`;

export default function WorkDetailPageWrapper({ children }) {
  return (
    <StyledWrapper id='work-detail-page-wrapper'>{children}</StyledWrapper>
  );
}
