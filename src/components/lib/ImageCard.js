import React from "react";
import { Link } from "gatsby";
import "twin.macro";

const paragraphStyle = {
  margin: ".5rem  0 2rem",
  width: "75%",
};

const ImageCard = ({ title, paragraph, categoryLink, children }) => {
  return (
    <div>
      <Link to={categoryLink}>
        <div tw='flex flex-wrap mb-8 rounded-md hover:(ring ring-offset-0 ring-softGreen ring-opacity-30)'>
          <div
            className='image-wrapper'
            tw='w-full rounded-t-md object-cover overflow-hidden'
          >
            {children}
          </div>
          <div tw='h-auto w-full backgroundColor[#f1ece6] p-6 rounded-b-md 2xl:h-44 xl:h-52 lg:h-52'>
            <h2 tw='text-dark mb-3'>{title}</h2>
            <p tw='w-full'>{paragraph}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ImageCard;
