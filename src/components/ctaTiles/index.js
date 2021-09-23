import React from "react";
import "twin.macro";

import ActivityMap from "../ActivityMap";
import Tile from "./Tile";
import PageLayoutWrapper from "../layoutWrappers/PageLayoutWrapper";

export default function CtaTiles() {
  return (
    <PageLayoutWrapper>
      <ActivityMap />
      <div tw='flex content-between space-x-3 mb-14'>
        <Tile link={`/about/`} tileColor='softGreen'>
          <h3 tw='text-white'>About BBS</h3>
        </Tile>
        <Tile link={`/work/`} tileColor='mildGray'>
          <h3 tw='text-white'>View All Work</h3>
        </Tile>
      </div>
    </PageLayoutWrapper>
  );
}
