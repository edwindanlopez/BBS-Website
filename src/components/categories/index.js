import React from "react";
import "twin.macro";

import HomepageWrapper from "../layoutWrappers/HomepageWrapper";
import Category from "./Category";

const categories = [
  "Showers",
  "Floors",
  "Cabinets",
  "Mural",
  "Closests",
  "Wood Repairs",
  "Illustrations",
];

export default function Categories() {
  return (
    <HomepageWrapper>
      <h2 tw='mb-4'>Categories</h2>
      <Category categories={categories} />
    </HomepageWrapper>
  );
}
