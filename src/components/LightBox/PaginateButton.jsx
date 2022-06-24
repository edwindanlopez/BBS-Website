import React from 'react';
import 'twin.macro';
import PropTypes from 'prop-types';

export default function PaginateButton({ id, onClick }) {
  return (
    <button
      id={id}
      type="button"
      onClick={() => onClick()}
      tw="text-white p-4 rounded-md hover:(bg-white bg-opacity-30)"
    >
      {id === 'ltbox-paginate-left' ? <LeftArrowIcon /> : <RightArrowIcon />}
    </button>
  );
}

function LeftArrowIcon() {
  return (
    <svg
      className="right-arrow-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="28"
    >
      <path
        id="left-ltbox-arrow"
        d="M22,32,36,18l4,4.486L30.485,32,40,41.513,36,46,22,32Z"
        transform="translate(-22 -18)"
        fill="#fff"
      />
    </svg>
  );
}

function RightArrowIcon() {
  return (
    <svg
      className="right-arrow-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="28"
    >
      <path
        id="right-ltbox-arrow"
        d="M18 14 4 0 0 4.486 9.515 14 0 23.513 4 28l14-14Z"
        fill="#fff"
      />
    </svg>
  );
}

PaginateButton.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
};

PaginateButton.defaultProps = {
  id: '',
  onClick: () => {},
};
