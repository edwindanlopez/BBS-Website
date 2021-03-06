import React, { useCallback } from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import 'twin.macro';
import PropTypes from 'prop-types';

import '@reach/dialog/styles.css';
import Button from './Button';

export default function Modal({ modalStatus, setModalStatus }) {
  const { isOpen, success } = modalStatus;

  const handleClick = useCallback(() => {
    setModalStatus((prevModalStatus) => ({
      ...prevModalStatus,
      isOpen: false,
      success: null,
      failed: null,
      err: null,
    }));
  }, [setModalStatus]);

  return (
    <DialogOverlay
      className="Modal"
      style={{
        background: 'rgb(255 255 255 / 75%)',
        zIndex: '50',
        display: 'flex',
      }}
      isOpen={isOpen}
      onDismiss={() =>
        setModalStatus((prevStatus) => ({
          ...prevStatus,
          isOpen: true,
        }))
      }
      aria-label="image in LightBox mode"
      allowPinchZoom
    >
      <DialogContent
        aria-label="Modal displaying contact form submission status"
        tw="flex flex-wrap justify-center items-center"
        style={{
          background: 'none',
        }}
      >
        {success ? (
          <SuccessMessage onItemClick={handleClick} />
        ) : (
          <FailedMessage onItemClick={handleClick} modalStatus={modalStatus} />
        )}
      </DialogContent>
    </DialogOverlay>
  );
}

function SuccessMessage({ onItemClick }) {
  return (
    <div
      className="modal-wrapper"
      tw="border rounded-md border-lightGray shadow-2xl pl-16 pr-16 pt-16 pb-14 bg-white text-center"
    >
      <h1>Success! Thanks for contacting us.</h1>
      <div tw="w-96">
        <p tw="mt-4 text-lightGray">
          Your message has been successfully submitted.
        </p>
        <p tw="mt-8">
          Please allow up to 24 hours for our reply. Our goal is to get back to
          you shortly.
        </p>
        <br />
        <p tw="text-lightGray">Our work hours are M-F, 9am - 6:30pm</p>
        <Button variant="primary" tw="mt-8" onClick={onItemClick}>
          <p>Continue</p>
        </Button>
      </div>
    </div>
  );
}

function FailedMessage({ onItemClick, modalStatus }) {
  const error = modalStatus.err;
  return (
    <div
      className="modal-wrapper"
      tw="border rounded-md border-lightGray shadow-2xl pl-16 pr-16 pt-16 pb-14 bg-white text-center"
    >
      <h1>Submission failed :( </h1>
      <div tw="w-96">
        <p tw="mt-4 text-lightGray">
          We&apos;ve encountered an error with this submission.
        </p>
        <p tw="mt-8">{error}</p>
        <p tw="mt-8">
          This may be due to poor internet connection or server issues. Please
          try again later.
        </p>
        <br />
        <p tw="text-lightGray">
          If the problem persists, please call 407.848.0562
        </p>
        <br />
        <Button variant="primary" tw="mt-8" onClick={onItemClick}>
          <p>Continue</p>
        </Button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  modalStatus: PropTypes.shape({
    isOpen: PropTypes.bool,
    success: PropTypes.bool,
    failed: PropTypes.bool,
    err: PropTypes.bool,
  }),
  setModalStatus: PropTypes.func,
};

Modal.defaultProps = {
  modalStatus: {
    isOpen: false,
    success: null,
    failed: null,
    err: null,
  },
  setModalStatus: (prevState) => prevState,
};

SuccessMessage.propTypes = {
  onItemClick: PropTypes.func,
};

SuccessMessage.defaultProps = {
  onItemClick: () => {},
};

FailedMessage.propTypes = {
  onItemClick: PropTypes.func,
  modalStatus: PropTypes.shape({
    err: PropTypes.string,
  }),
};

FailedMessage.defaultProps = {
  onItemClick: () => {},
  modalStatus: '',
};
