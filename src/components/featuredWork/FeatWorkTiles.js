import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import "twin.macro";

import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export default function FeatWorkTiles({ data }) {
  const nodes = data.allMdx.nodes;

  return (
    <Swiper
      wrapperTag='div'
      modules={[Pagination, Navigation]}
      pagination={{
        clickable: true,
      }}
      navigation
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
        1150: {
          slidesPerView: "3",
          spaceBetween: 10,
        },
      }}
    >
      {nodes.map((node, i) => (
        <SwiperSlide key={node.id}>
          <h3 tw='mt-2 mb-2'>{node.frontmatter.title}</h3>
          <Link to={`/work/${node.slug}`}>
            <GatsbyImage
              tw='relative w-full h-[30rem] object-cover object-center rounded-md 2xl:height[35rem]'
              image={getImage(node.frontmatter.hero_image)}
              alt={node.frontmatter.hero_image_alt}
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
