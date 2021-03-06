import React from 'react';
import { Link } from 'gatsby';
import 'twin.macro';
import PropTypes from 'prop-types';

function ImageCard({ title, paragraph, categoryLink, children }) {
  return (
    <div>
      <Link to={categoryLink}>
        <div tw="flex flex-wrap mb-8 rounded-md">
          <div
            className="image-wrapper"
            tw="w-full rounded-t-md object-cover overflow-hidden"
          >
            {children}
          </div>
          <div tw="h-auto w-full backgroundColor[#f1ece6] p-6 rounded-b-md 2xl:h-44 xl:h-52 lg:h-52">
            <h2 tw="text-dark mb-3">{title}</h2>
            <p tw="w-full">{paragraph}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ImageCard;

ImageCard.propTypes = {
  title: PropTypes.string,
  paragraph: PropTypes.string,
  categoryLink: PropTypes.string,
  children: PropTypes.node,
};

ImageCard.defaultProps = {
  title: '',
  paragraph: '',
  categoryLink: '',
  children: null,
};
