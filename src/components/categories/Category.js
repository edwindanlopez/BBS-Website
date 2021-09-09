import React from "react";
import tw from "twin.macro";

export default function Category({ categories }) {
  return (
    <div tw='flex overflow-x-scroll'>
      {categories.map((el) => (
        <div tw='relative pr-6' key={el}>
          <div
            className={`${el}-tile-texture`}
            css={[
              // base styles
              tw`h-28 w-28 bg-contain flex justify-center items-center rounded-full bg-gradient-to-r from-beige to-tan`,
              // conditional styles
              el === "Showers" &&
                tw`bg-shower-ptrn flex justify-center items-center after:block after:w-12 after:opacity-100 after:content-[url(https:/\\/daniellopezdesign.nyc3.digitaloceanspaces.com/BBS/category-svg-icons/shower-icon.svg)]`,
              el === "Floors" &&
                tw`bg-floor-ptrn flex justify-center items-center after:block after:w-12 after:opacity-100 after:content-[url(https:/\\/daniellopezdesign.nyc3.digitaloceanspaces.com/BBS/category-svg-icons/floor-icon.svg)]`,
              el === "Cabinets" &&
                tw`bg-cbnt-ptrn flex justify-center items-center after:block after:w-12 after:opacity-100 after:content-[url(https:/\\/daniellopezdesign.nyc3.digitaloceanspaces.com/BBS/category-svg-icons/cabinet-icon.svg)]`,
              el === "Mural" &&
                tw`bg-mural-ptrn flex justify-center items-center after:block after:w-16 after:opacity-100 after:content-[url(https:/\\/daniellopezdesign.nyc3.digitaloceanspaces.com/BBS/category-svg-icons/mural-icon.svg)]`,
              el === "Closests" &&
                tw`bg-closet-ptrn flex justify-center items-center after:block after:w-14 after:opacity-100 after:content-[url(https:/\\/daniellopezdesign.nyc3.digitaloceanspaces.com/BBS/category-svg-icons/closet-icon.svg)]`,
              el === "Wood Repairs" &&
                tw`bg-woodrpr-ptrn flex justify-center items-center after:block after:w-11 after:opacity-100 after:content-[url(https:/\\/daniellopezdesign.nyc3.digitaloceanspaces.com/BBS/category-svg-icons/wood-repair-icon.svg)]`,
              el === "Illustrations" &&
                tw`bg-illus-ptrn flex justify-center items-center after:block after:w-8 after:opacity-100 after:content-[url(https:/\\/daniellopezdesign.nyc3.digitaloceanspaces.com/BBS/category-svg-icons/illustration-icon.svg)]`,
            ]}
          ></div>
          <p tw='w-full text-center mt-2 mb-2'>{el}</p>
        </div>
      ))}
    </div>
  );
}
