/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import 'twin.macro';
import PropTypes from 'prop-types';

import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

function Project({ data }) {
  const { nodes } = data.allMdx;

  return (
    <Swiper
      wrapperTag="div"
      modules={[Pagination, Navigation]}
      navigation
      breakpoints={{
        320: {
          slidesPerView: '1',
          spaceBetween: 10,
        },
        480: {
          slidesPerView: '1.5',
          spaceBetween: 10,
        },
        640: {
          slidesPerView: '3',
          spaceBetween: 10,
        },
      }}
    >
      {nodes.map((node) => (
        <SwiperSlide key={node.id}>
          <Link to={`/work/${node.slug}`}>
            <GatsbyImage
              tw="relative w-full h-[30rem] rounded-md object-cover object-center 2xl:h-96"
              image={getImage(node.frontmatter.secondary_hero_image)}
              alt={node.frontmatter.secondary_hero_image_alt}
            />
          </Link>
          <h3 tw="text-mildGray text-xl mt-2 mb-2">{node.frontmatter.title}</h3>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Project;

Project.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
};

Project.defaultProps = {
  data: {
    allMdx: {
      nodes: [],
    },
  },
};
