import React from "react";
import { theme } from "twin.macro";

import HomepageWrapper from "../layoutWrappers/HomepageWrapper";
import Project from "./project";

export default function Otherprojects() {
  return (
    <HomepageWrapper>
      <h2 tw='mb-4'>Other mentionable projects</h2>
      <Project />
    </HomepageWrapper>
  );
}
