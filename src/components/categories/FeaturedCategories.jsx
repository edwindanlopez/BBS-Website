/* eslint-disable import/no-unresolved */
import React from 'react';
import tw from 'twin.macro';
import { Link } from 'gatsby';

import { Pagination, Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import PageLayoutWrapper from '../layoutWrappers/PageLayoutWrapper';

const categories = ['artistic', 'bathroom', 'closet', 'custom', 'restoration'];

export default function Categories() {
  return (
    <PageLayoutWrapper tw="w-full md:width[90%]">
      <div id="feat-cat-slider" tw="w-full md:width[90%] mx-auto mt-[-3.5rem]">
        <Swiper
          tw="h-[10rem]"
          modules={[Pagination, Navigation, Scrollbar]}
          scrollbar={{ draggable: true }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: '3',
              spaceBetween: 10,
            },
            480: {
              slidesPerView: '3',
              spaceBetween: 50,
            },
            640: {
              slidesPerView: '4',
              spaceBetween: 20,
            },
            1020: {
              slidesPerView: '5',
              spaceBetween: 20,
            },
          }}
        >
          <div tw="flex">
            {categories.map((el) => (
              <SwiperSlide
                key={el}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'self-start',
                }}
              >
                <Link to={`/category/${el}/`}>
                  <div
                    className={`${el}-tile-texture`}
                    css={[
                      // base styles
                      tw`h-24 w-24 sm:h-28 sm:w-28 bg-contain flex justify-center items-center rounded-full bg-gradient-to-r from-beige to-tan border-4 shadow-2xl border-lightGray hover:(border-orangeAmber) box-border`,
                      // conditional styles
                      el === 'artistic' &&
                        tw`bg-illus-ptrn after:block after:w-12 after:opacity-100`,
                      el === 'bathroom' &&
                        tw`bg-shower-ptrn after:block after:w-12 after:opacity-100`,
                      el === 'closet' &&
                        tw`bg-closet-ptrn after:block after:w-14 after:opacity-100`,
                      el === 'custom' &&
                        tw`bg-custom-ptrn after:block after:w-8 after:opacity-100`,
                      el === 'floor' &&
                        tw`bg-floor-ptrn after:block after:w-12 after:opacity-100`,
                      el === 'restoration' &&
                        tw`bg-woodrpr-ptrn after:block after:w-11 after:opacity-100`,
                    ]}
                  >
                    <p tw="absolute text-center font-bold text-sm text-dark">
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
