import React from "react";
import "twin.macro";
import PageButton from "../shared/PageButton";
import carrotArrow from "../../images/carrot-arrow.svg";
import { Link } from "gatsby";

function Pagination({
  pages,
  hasNextPage,
  hasPrevPage,
  prevPagePath,
  nextPagePath,
  ...rest
}) {
  return (
    <div tw='flex justify-center items-center'>
      <div tw='h-14 bg-white pl-4 pr-4 rounded-full filter drop-shadow-xl flex justify-center items-center sm:drop-shadow-none'>
        {hasPrevPage && (
          <Link to={prevPagePath}>
            <img
              alt='Left page carrot arrow'
              src={carrotArrow}
              tw='rotate-90 mr-2 w-3'
            />
          </Link>
        )}
        <PageButton qty={pages} {...rest} />
        {hasNextPage && (
          <Link to={nextPagePath}>
            <img
              alt='Right page carrot arrow'
              src={carrotArrow}
              tw='-rotate-90 ml-2 w-3'
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Pagination;
