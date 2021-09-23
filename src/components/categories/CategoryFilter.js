import React from "react";
import { Link, useScrollRestoration } from "gatsby";
import tw from "twin.macro";

import AllIcon from "../../images/category-svg-icons/all-icon.svg";
import drawerIcon from "../../images/category-svg-icons/drawer-icon.svg";
import closetIcon from "../../images/category-svg-icons/closet-icon.svg";
import restoreIcon from "../../images/category-svg-icons/restore-icon.svg";
import showerIcon from "../../images/category-svg-icons/shower-icon.svg";
import defaultIcon from "../../images/category-svg-icons/all-icon.svg";

export default function CategoryFilter({ allCategories, category }) {
  return (
    <div
      className='category-filter'
      tw=' grid grid-cols-3 mt-8 place-items-center gap-6 sm:grid-cols-5 sm:w-11/12 sm:mx-auto lg:w-9/12 '
    >
      <span>
        <Link to={`/work/`}>
          <div
            css={[
              // style the "all" category as selected
              tw`w-12 h-12 rounded-full bg-pasteleGreen m-auto p-2 flex justify-center items-center`,
              category === undefined && tw`border-2 border-orangeAmber`,
            ]}
          >
            <img src={AllIcon} alt='select-all-icon' tw='w-3/4' />
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
                  if (cat.fieldValue === "cabinets") {
                    return (
                      <img src={drawerIcon} alt='cabinet-icon' tw='w-3/4' />
                    );
                  } else if (cat.fieldValue === "closet") {
                    return (
                      <img src={closetIcon} alt='drawer-icon' tw='w-3/4' />
                    );
                  } else if (cat.fieldValue === "restoration") {
                    return (
                      <img
                        src={restoreIcon}
                        alt='restoration-icon'
                        tw='w-4/5'
                      />
                    );
                  } else if (cat.fieldValue === "shower") {
                    return (
                      <img src={showerIcon} alt='shower-icon' tw='w-3/4' />
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
