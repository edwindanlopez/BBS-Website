import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import "twin.macro";

import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const Project = ({ data }) => {
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
          slidesPerView: "3",
          spaceBetween: 10,
        },
      }}
    >
      {nodes.map((node, i) => {
        return (
          <SwiperSlide key={node.id}>
            <h3 tw='mt-2 mb-2'>{node.frontmatter.title}</h3>
            <Link to={`/work/${node.slug}`}>
              <GatsbyImage
                tw='relative w-full h-72 rounded-md object-cover object-center 2xl:h-96'
                image={getImage(node.frontmatter.secondary_hero_image)}
                alt={node.frontmatter.secondary_hero_image_alt}
              />
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Project;
