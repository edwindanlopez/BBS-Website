import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import 'twin.macro';
import PropTypes from 'prop-types';

import { Pagination, Navigation } from 'swiper';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination';

export default function FeatWorkTiles({ data }) {
  const { nodes } = data.allMdx;
  console.log('Data nodes: ', nodes);

  return (
    <Swiper
      wrapperTag="div"
      modules={[Pagination, Navigation]}
      pagination={{
        clickable: true,
      }}
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
          slidesPerView: '2',
          spaceBetween: 10,
        },
      }}
    >
      {nodes.map((node) => (
        <SwiperSlide key={node.id}>
          <Link to={`/work/${node.slug}`}>
            <GatsbyImage
              tw="relative w-full h-[30rem] object-cover object-center rounded-md lg:h-[40rem]"
              image={getImage(node.frontmatter.hero_image)}
              alt={node.frontmatter.hero_image_alt}
            />
          </Link>
          <h3 tw="text-mildGray text-xl mt-2">{node.frontmatter.title}</h3>
          <p tw="text-sm font-semibold text-orangeAmber">
            View All {node.frontmatter.numOfTotalImages} images
          </p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

FeatWorkTiles.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
};

FeatWorkTiles.defaultProps = {
  data: {
    allMdx: {
      nodes: [],
    },
  },
};
