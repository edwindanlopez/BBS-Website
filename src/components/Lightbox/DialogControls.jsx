import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PaginateButton from './PaginateButton';
import LightboxContext from './LightboxContext';
import 'twin.macro';

function CloseButton() {
  const { setShowDialog } = useContext(LightboxContext);

  return (
    <button
      type="button"
      onClick={() => setShowDialog(false)}
      className="close-button"
      tw="text-white mr-4 p-2 rounded-md hover:bg-white hover:bg-opacity-20"
    >
      <span aria-hidden>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15">
          <path
            d="M15 2.727 12.273 0 7.5 4.773 2.727 0 0 2.727 4.773 7.5 0 12.273 2.727 15 7.5 10.227 12.273 15 15 12.273 10.227 7.5Z"
            fill="#fff"
          />
        </svg>
      </span>
    </button>
  );
}

export default function DialogControls({ paginate }) {
  return (
    <div
      aria-hidden
      className="slider-btn-container"
      tw="w-full absolute bottom-0 z-40 flex justify-center"
    >
      <div
        style={{
          width: '20rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: '40',
        }}
      >
        <PaginateButton
          id="ltbox-paginate-left"
          onClick={() => paginate(-1)}
          tw="z-40"
        />
        <CloseButton />
        <PaginateButton
          id="ltbox-paginate-right"
          onClick={() => paginate(1)}
          tw="z-40"
        />
      </div>
    </div>
  );
}

DialogControls.propTypes = {
  paginate: PropTypes.func,
};

DialogControls.defaultProps = {
  paginate: () => {},
};
