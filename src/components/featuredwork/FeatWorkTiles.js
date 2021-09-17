import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import "twin.macro";

import SwiperCore, { Virtual, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/virtual";
import "swiper/css/pagination";

export default function FeatWorkTiles({ data }) {
  const nodes = data.allMdx.nodes;
  SwiperCore.use([Pagination]);

  return (
    <Swiper
      virtual
      modules={[Virtual]}
      autoHeight={true}
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
      {nodes.map((node, i) => (
        <SwiperSlide key={node} virtualIndex={i}>
          <div key={node.id}>
            <Link to={`/work/${node.slug}`}>
              <GatsbyImage
                tw='relative w-full h-96 sm:h-72 object-cover object-center rounded-md'
                image={getImage(node.frontmatter.hero_image)}
                alt={node.frontmatter.hero_image_alt}
              />
            </Link>
            <h3 tw='w-full text-left mt-2 mb-2'>{node.frontmatter.title}</h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
