import React, { useState, useRef } from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import tw from "twin.macro";

import PageLayoutWrapper from "../layoutWrappers/PageLayoutWrapper";
import WorkDetailPageWrapper from "../layoutWrappers/WorkDetailPageWrapper";
import carrotArrow from "../../images/carrot-arrow.svg";

export default function DetailPageCard(mdx) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const ReadBtn = ({ isOpen, children }) => {
    return (
      <button onClick={toggle}>
        <PageLayoutWrapper tw='text-left'>
          <span>
            <p tw='inline text-orangeAmber font-semibold'>
              {isOpen ? "Read less" : "Read more"}
            </p>
            <img
              src={carrotArrow}
              alt='carrot-arrow'
              css={[
                tw`inline ml-2`,
                isOpen && tw`transform ease-in-out -rotate-180 `,
              ]}
            />
          </span>
        </PageLayoutWrapper>
        <div tw='text-left'>{children}</div>
      </button>
    );
  };

  return (
    <WorkDetailPageWrapper>
      <div
        className='card-holder-wrapper'
        tw='w-full flex justify-center md:(mt-3 justify-end)'
      >
        <div
          className='card-holder'
          tw='w-full pt-2 bg-white rounded-tl-xl rounded-tr-xl md:(width[28rem])'
        >
          <ReadBtn isOpen={isOpen}>
            <PageLayoutWrapper>
              <h1 tw='text-mossGreen mt-2 mb-2'>{mdx.frontmatter.title}</h1>
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
                <div tw='mb-4'>
                  <MDXRenderer>{mdx.body}</MDXRenderer>
                </div>
              </Collapse>
            </PageLayoutWrapper>
          </ReadBtn>
        </div>
      </div>
    </WorkDetailPageWrapper>
  );
}

const Collapse = ({ isOpen, children }) => {
  const ref = useRef(null);
  return (
    <div
      ref={ref}
      css={[
        tw`ease-in-out mt-2 text-gray-600 overflow-hidden duration-300`,
        isOpen ? { height: ref.current?.scrollHeight } : { height: 0 },
      ]}
    >
      {children}
    </div>
  );
};
