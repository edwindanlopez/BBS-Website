import React, { useState, useRef } from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import tw from "twin.macro";

export default function DetailPageCard(mdx) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const ReadBtn = ({ isOpen }) => {
    return (
      <button onClick={toggle} css={[isOpen && tw`mt-4 `]}>
        <span>
          <p tw='inline text-orangeAmber font-semibold'>
            {isOpen ? "Read less" : "Read more"}
          </p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='10'
            height='7'
            css={[
              tw`inline ml-2`,
              isOpen && tw`transform ease-in-out -rotate-180 `,
            ]}
          >
            <path
              data-name='Path 54'
              d='M1.072 0a1.027 1.027 0 01.759.342L5.01 3.7 8.181.342a1.013 1.013 0 011.517.029 1.241 1.241 0 010 1.621L5.01 7 .31 1.991a1.24 1.24 0 010-1.65A1.031 1.031 0 011.072 0z'
              fill='#b85f53'
            />
          </svg>
        </span>
      </button>
    );
  };

  return (
    <div className='card-holder-wrapper' tw='sticky bottom-0 transform '>
      <div
        className='card-holder'
        tw='w-11/12 mx-auto p-5 bg-white rounded-tl-xl rounded-tr-xl'
      >
        <h1 tw='text-mossGreen mb-2'>{mdx.frontmatter.title}</h1>
        <h3 tw='mt-2 mb-4'>{mdx.frontmatter.subhead}</h3>
        <Collapse isOpen={isOpen}>
          <span tw='block'>
            <h3 tw='inline-block'>Area / Location:</h3>
            <h3 tw='inline-block ml-2 text-softGreen'>
              {mdx.frontmatter.location}
            </h3>
          </span>
          <span tw='block mb-4'>
            <h3 tw='inline-block pt-2 pb-2'>Date:</h3>
            <h3 tw='inline-block ml-2 pt-2 pb-2 text-softGreen'>
              {mdx.frontmatter.date}
            </h3>
          </span>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Collapse>
        <ReadBtn isOpen={isOpen} />
      </div>
    </div>
  );
}

const Collapse = ({ isOpen, children }) => {
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      aria-hidden={!isOpen}
      css={[
        tw`ease-in-out mt-2 text-gray-600 overflow-hidden duration-300`,
        isOpen ? { height: ref.current?.scrollHeight } : { height: 0 },
      ]}
    >
      {children}
    </div>
  );
};
