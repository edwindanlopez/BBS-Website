import React from "react";
import tw from "twin.macro";

const StyledWrapper = tw.div`
  md:w-11/12 md:mx-auto
`;

export default function WorkDetailPageWrapper({ children }) {
  return (
    <StyledWrapper id='work-detail-page-wrapper'>{children}</StyledWrapper>
  );
}
