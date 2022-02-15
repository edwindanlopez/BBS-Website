import React from 'react';
import tw from 'twin.macro';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

function PageButton({ qty, pageSlug, ...rest }) {
  return (
    <div tw="flex justify-center items-center">
      {qty.map((num) => {
        const active = Boolean(num === rest.currentPage);
        const pageLink = num === 0 ? pageSlug : `${pageSlug}page/${num}/`;
        return (
          <Link to={pageLink} key={num}>
            <div
              css={[
                tw`w-8 h-8 mx-2 border rounded-md flex justify-center items-center`,
                active && tw`bg-orangeAmber`,
              ]}
            >
              <p css={[active && tw`text-beige`]}>{num}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default PageButton;

PageButton.propTypes = {
  qty: PropTypes.arrayOf(PropTypes.number),
  pageSlug: PropTypes.string,
};

PageButton.defaultProps = {
  qty: [],
  pageSlug: '',
};
