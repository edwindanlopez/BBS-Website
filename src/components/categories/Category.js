import React from "react";
import tw from "twin.macro";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";

export default function Category({ categories }) {
  SwiperCore.use([Scrollbar]);
  return (
    <Swiper
      scrollbar={{
        hide: true,
        draggable: true,
      }}
      breakpoints={{
        320: {
          slidesPerView: "3",
          spaceBetween: 10,
        },
        480: {
          slidesPerView: "4",
          spaceBetween: 10,
        },
        640: {
          slidesPerView: "5",
          spaceBetween: 10,
        },
      }}
    >
      <div tw='flex overflow-x-scroll'>
        {categories.map((el) => (
          <SwiperSlide key={el}>
            <div
              className={`${el}-tile-texture`}
              css={[
                // base styles
                tw`h-24 w-24 sm:h-28 sm:w-28 bg-contain flex justify-center items-center rounded-full bg-gradient-to-r from-beige to-tan`,
                // conditional styles
                el === "Showers" &&
                  tw`bg-shower-ptrn flex justify-center items-center after:block after:w-12 after:opacity-100 `,
                el === "Floors" &&
                  tw`bg-floor-ptrn flex justify-center items-center after:block after:w-12 after:opacity-100 `,
                el === "Cabinets" &&
                  tw`bg-cbnt-ptrn flex justify-center items-center after:block after:w-12 after:opacity-100 `,
                el === "Mural" &&
                  tw`bg-mural-ptrn flex justify-center items-center after:block after:w-16 after:opacity-100 `,
                el === "Closests" &&
                  tw`bg-closet-ptrn flex justify-center items-center after:block after:w-14 after:opacity-100 `,
                el === "Wood Repairs" &&
                  tw`bg-woodrpr-ptrn flex justify-center items-center after:block after:w-11 after:opacity-100 `,
                el === "Illustrations" &&
                  tw`bg-illus-ptrn flex justify-center items-center after:block after:w-8 after:opacity-100 `,
              ]}
            >
              <p tw='absolute text-center font-bold text-sm text-ltgray'>
                {el}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  );
}
