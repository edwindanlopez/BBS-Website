import * as React from 'react';
import tw from 'twin.macro';
import PropTypes from 'prop-types';

function StyledButton({ children, variant, type, ...rest }) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      css={[
        tw`
            w-full
            rounded-md
            border
            p-3
            inline-flex
            items-center
            justify-center
            focus:outline-none
            focus:ring-2
            focus:ring-inset
          `,
        variant === 'primary' &&
          tw`
              bg-white
              border-softGreen
              text-softGreen
              hover:text-mossGreen
              focus:ring-mossGreen
            `,
        variant === 'secondary' &&
          tw`
              bg-white
              border-mildGray
              text-mildGray
              hover:text-mossGreen
              focus:ring-mossGreen
            `,
      ]}
      {...rest}
    >
      {children}
    </button>
  );
}

export default StyledButton;

StyledButton.propTypes = {
  variant: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.element,
};

StyledButton.defaultProps = {
  variant: '',
  type: 'button',
  children: undefined,
};
