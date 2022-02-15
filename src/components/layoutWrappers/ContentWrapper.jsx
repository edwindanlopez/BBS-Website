import React from 'react';
import 'twin.macro';
import PropTypes from 'prop-types';

export default function ContentWrapper({ children }) {
  return (
    <div
      id="content-wrapper"
      tw="mx-auto sm:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl"
    >
      {children}
    </div>
  );
}

ContentWrapper.propTypes = {
  children: PropTypes.element,
};

ContentWrapper.defaultProps = {
  children: undefined,
};
