/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import 'twin.macro';
import PropTypes from 'prop-types';

import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function WorkTiles({ node }) {
  const featImages = node.frontmatter.featured_images;

  return (
    <Swiper
      tag="section"
      modules={[Navigation, Pagination]}
      navigation
      wrapperTag="div"
      pagination={{
        clickable: true,
      }}
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
        1400: {
          slidesPerView: '3',
          spaceBetween: 10,
        },
      }}
    >
      {featImages.map(
        (img) =>
          img && (
            <SwiperSlide key={img.id}>
              <Link to={`/work/${node.slug}`}>
                <GatsbyImage
                  tw="relative w-full h-[30rem] object-cover object-center rounded-md"
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

WorkTiles.propTypes = {
  node: PropTypes.shape({
    frontmatter: PropTypes.shape({
      featured_images: PropTypes.arrayOf(PropTypes.object),
    }),
    slug: PropTypes.string,
  }),
};

WorkTiles.defaultProps = {
  node: {
    frontmatter: {
      featured_images: [],
    },
  },
};
