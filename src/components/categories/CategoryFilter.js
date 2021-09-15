import React from "react";
import { Link } from "gatsby";
import tw from "twin.macro";

export default function CategoryFilter({ allCategories, category }) {
  return (
    <div
      className='category-filter'
      tw=' grid grid-cols-3 mt-8 place-content-between place-items-center gap-6'
    >
      <span>
        <Link to={`/work/`}>
          <div
            css={[
              tw`w-12 h-12 rounded-full bg-pasteleGreen m-auto p-2`,
              category === undefined && tw`border-2 border-orangeAmber`,
            ]}
          ></div>
          <p tw='text-center uppercase tracking-widest self-center fontSize[0.65rem]'>
            All
          </p>
        </Link>
      </span>
      {allCategories.map((cat, i) => {
        return (
          <span key={i}>
            <Link to={`/category/${cat.fieldValue}/`}>
              <div
                css={[
                  tw`w-12 h-12 rounded-full bg-pasteleGreen m-auto p-2`,
                  cat.fieldValue === category &&
                    tw`border-2 border-orangeAmber`,
                ]}
              ></div>
              <p tw='text-center uppercase tracking-widest self-center fontSize[0.65rem]'>
                {cat.fieldValue}
              </p>
            </Link>
          </span>
        );
      })}
    </div>
  );
}
