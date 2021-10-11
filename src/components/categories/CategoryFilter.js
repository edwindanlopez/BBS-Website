import React from "react";
import { Link } from "gatsby";
import tw from "twin.macro";

import allIcon from "../../images/category-svg-icons/all-icon.svg";
import customIcon from "../../images/category-svg-icons/custom-icon.svg";
import closetIcon from "../../images/category-svg-icons/closet-icon.svg";
import restorationIcon from "../../images/category-svg-icons/restoration-icon.svg";
import bathroomIcon from "../../images/category-svg-icons/bathroom-icon.svg";
import artisticIcon from "../../images/category-svg-icons/artistic-icon.svg";

export default function CategoryFilter({ allCategories, category }) {
  return (
    <div
      className='category-filter'
      tw=' grid grid-cols-3 mt-8 place-items-center gap-6 sm:grid-cols-6 sm:w-11/12 sm:mx-auto lg:w-9/12 '
    >
      <span>
        <Link to={`/work/`}>
          <div
            css={[
              tw`w-12 h-12 rounded-full bg-pasteleGreen m-auto p-2 flex justify-center items-center`,
              category === "all" && tw`border-2 border-orangeAmber`,
            ]}
          >
            <img src={allIcon} alt='select-all-icon' tw='w-3/4' />
          </div>
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
                  tw`w-12 h-12 rounded-full bg-pasteleGreen m-auto p-2 flex justify-center items-center hover:(border-2 border-orangeAmber)`,
                  cat.fieldValue === category &&
                    tw`border-2 border-orangeAmber`,
                ]}
              >
                {(() => {
                  if (cat.fieldValue === "custom") {
                    return (
                      <img
                        src={customIcon}
                        alt='Custom drawer icon'
                        tw='w-3/4'
                      />
                    );
                  } else if (cat.fieldValue === "closet") {
                    return (
                      <img src={closetIcon} alt='Closet icon' tw='w-3/4' />
                    );
                  } else if (cat.fieldValue === "restoration") {
                    return (
                      <img
                        src={restorationIcon}
                        alt='Forever symbol icon'
                        tw='w-4/5'
                      />
                    );
                  } else if (cat.fieldValue === "bathroom") {
                    return (
                      <img src={bathroomIcon} alt='Bathroom icon' tw='w-3/4' />
                    );
                  } else if (cat.fieldValue === "artistic") {
                    return (
                      <img
                        src={artisticIcon}
                        alt='Art paint brush icon'
                        tw='w-3/4'
                      />
                    );
                  }
                })()}
              </div>
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
