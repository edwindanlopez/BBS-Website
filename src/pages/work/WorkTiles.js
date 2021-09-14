import React, { useEffect } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import "twin.macro";

import SwiperCore, { Virtual, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/virtual";

export default function WorkTiles({ node }) {
  SwiperCore.use([Pagination]);
  const featImages = node.frontmatter.featured_images;

  return (
    <Swiper
      tag='section'
      wrapperTag='div'
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        320: {
          slidesPerView: "1",
          spaceBetween: 10,
        },
        480: {
          slidesPerView: "1.5",
          spaceBetween: 10,
        },
        640: {
          slidesPerView: "2",
          spaceBetween: 10,
        },
      }}
    >
      {featImages.map(
        (img) =>
          img && (
            <SwiperSlide key={img.id}>
              <Link to={`/work/${node.slug}`} tw='h-96'>
                <GatsbyImage
                  tw='relative w-full h-96 sm:h-72 object-cover object-center rounded-md'
                  image={getImage(img.childImageSharp.gatsbyImageData)}
                  alt={img.id}
                />
              </Link>
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
}
