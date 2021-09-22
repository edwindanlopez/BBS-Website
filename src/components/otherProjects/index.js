import React from "react";
import "twin.macro";

import Project from "./project";
import PageLayoutWrapper from "../layoutWrappers/PageLayoutWrapper";

export default function Otherprojects() {
  return (
    <PageLayoutWrapper>
      <h2 tw='mt-6 mb-6'>Other mentionable projects</h2>
      <Project />
    </PageLayoutWrapper>
  );
}
