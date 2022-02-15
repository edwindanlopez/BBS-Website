import React from 'react';
import { Link } from 'gatsby';
import tw from 'twin.macro';
import PropTypes from 'prop-types';

export default function Tile({ link, tileColor, children, ...props }) {
  return (
    <div tw="w-full h-40" {...props}>
      <Link to={link} tw="w-full h-full">
        <div
          css={[
            tw`h-full rounded-md flex justify-center items-center`,
            tileColor === 'mildGray' &&
              tw`bg-mildGray hover:(backgroundColor[#3e3d3d] shadow-md)`,
            tileColor === 'softGreen' &&
              tw`bg-softGreen hover:(backgroundColor[#63866c] shadow-md)`,
            tileColor === 'orangeAmber' &&
              tw`bg-orangeAmber hover:(backgroundColor[#a0554b] shadow-md)`,
          ]}
        >
          {children}
        </div>
      </Link>
    </div>
  );
}

Tile.propTypes = {
  link: PropTypes.string,
  tileColor: PropTypes.string,
  children: PropTypes.element,
};

Tile.defaultProps = {
  link: '',
  tileColor: '',
  children: undefined,
};
