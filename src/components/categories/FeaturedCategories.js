import React from "react";
import tw from "twin.macro";
import { Link } from "gatsby";

import PageLayoutWrapper from "../layoutWrappers/PageLayoutWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";

const categories = [
  "closet",
  "floor",
  "illustration",
  "mural",
  "restoration",
  "shower",
];

export default function Categories() {
  SwiperCore.use([Scrollbar]);
  return (
    <PageLayoutWrapper>
      <h2 tw='mb-4'>Featured Categories</h2>
      <div>
        <Swiper
          tw='h-32'
          scrollbar={{
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
                <Link to={`/category/${el}/`}>
                  <div
                    className={`${el}-tile-texture`}
                    css={[
                      // base styles
                      tw`h-24 w-24 sm:h-28 sm:w-28 bg-contain flex justify-center items-center rounded-full bg-gradient-to-r from-beige to-tan`,
                      // conditional styles
                      el === "closet" &&
                        tw`bg-closet-ptrn flex justify-center items-center after:block after:w-14 after:opacity-100 `,
                      el === "floor" &&
                        tw`bg-floor-ptrn flex justify-center items-center after:block after:w-12 after:opacity-100 `,
                      el === "illustration" &&
                        tw`bg-illus-ptrn flex justify-center items-center after:block after:w-8 after:opacity-100 `,
                      el === "mural" &&
                        tw`bg-mural-ptrn flex justify-center items-center after:block after:w-16 after:opacity-100 `,
                      el === "restoration" &&
                        tw`bg-woodrpr-ptrn flex justify-center items-center after:block after:w-11 after:opacity-100 `,
                      el === "shower" &&
                        tw`bg-shower-ptrn flex justify-center items-center after:block after:w-12 after:opacity-100 `,
                    ]}
                  >
                    <p tw='absolute text-center font-bold text-sm text-ltgray'>
                      {el}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </PageLayoutWrapper>
  );
}
