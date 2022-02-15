import React from 'react';
import 'twin.macro';
import PropTypes from 'prop-types';

export default function Tags({ tags }) {
  return (
    <div tw="flex justify-end items-center">
      {tags.map((tag, i) => (
        <div key={i} tw="border borderColor[#d7d8de] pl-3 pr-2 ml-2 rounded-sm">
          <p tw="fontSize[10px] uppercase tracking-wider text-lightGray">
            {tag}
          </p>
        </div>
      ))}
    </div>
  );
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

Tags.defaultProps = {
  tags: [],
};
