import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import tw from "twin.macro";

import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

const PreviewButton = tw.button`
  bg-transparent border-0
`;

export default function Lightbox({ node }) {
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const image = getImage(node.childImageSharp.gatsbyImageData);
  return (
    <>
      <div tw='aspect-w-3 aspect-h-4 flex justify-center items-center mb-2'>
        <PreviewButton onClick={open}>
          <GatsbyImage
            image={image}
            alt={node.name}
            tw='h-full w-full object-center object-cover'
          />
        </PreviewButton>
      </div>
      <DialogOverlay
        className='dialog-overlay'
        style={{
          background: "#000000",
          zIndex: "50",
          display: "flex",
        }}
        isOpen={showDialog}
        onDismiss={close}
        aria-label='image in lightbox mode'
        allowPinchZoom={true}
      >
        <DialogContent
          aria-label='gallery image'
          className='dialog-content'
          style={{
            background: "unset",
            padding: "unset",
            width: "100vw",
            margin: "auto auto",
          }}
        >
          <div
            className='top-area'
            tw='relative w-full flex justify-end items-center h-16'
          >
            <button
              className='close-button'
              onClick={close}
              tw='text-white mr-4 p-2 rounded-md hover:bg-white hover:bg-opacity-20'
            >
              <span aria-hidden>
                <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15'>
                  <path
                    d='M15 2.727 12.273 0 7.5 4.773 2.727 0 0 2.727 4.773 7.5 0 12.273 2.727 15 7.5 10.227 12.273 15 15 12.273 10.227 7.5Z'
                    fill='#fff'
                  />
                </svg>
              </span>
            </button>
          </div>
          <div className='img-overlay-wrapper' tw='w-full flex items-center'>
            <span
              aria-hidden
              className='slider-btn-container'
              tw='absolute z-10 w-full flex justify-between items-center h-20'
            >
              <div className='previous'>
                <button
                  className='left-arrow-button'
                  onClick={() => {
                    console.log("Clicked Back");
                  }}
                  tw='text-white ml-4 p-4 rounded-md hover:bg-white hover:bg-opacity-20'
                >
                  <svg
                    className='left-arrow-icon'
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='28'
                    tw='opacity-20'
                  >
                    <path
                      d='M0 14 14 0l4 4.486L8.485 14 18 23.513 14 28 0 14Z'
                      fill='#fff'
                    />
                  </svg>
                </button>
              </div>
              <div className='next'>
                <button
                  className='right-arrow-button'
                  onClick={() => {
                    console.log("Clicked Forward");
                  }}
                  tw='text-white mr-4 p-4 rounded-md hover:bg-white hover:bg-opacity-20'
                >
                  <svg
                    className='right-arrow-icon'
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='28'
                    tw='opacity-20'
                  >
                    <path
                      d='M18 14 4 0 0 4.486 9.515 14 0 23.513 4 28l14-14Z'
                      fill='#fff'
                    />
                  </svg>
                </button>
              </div>
            </span>
            <GatsbyImage
              image={image}
              alt={node.name}
              style={{
                maxHeight: "100vh",
              }}
              imgStyle={{
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <div
            className='caption'
            tw='w-full flex justify-center items-center mt-2'
          >
            <p tw='text-white m-6'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum imperdiet arcu rutrum lorem mollis, non laoreet diam
              pulvinar. Maecenas.
            </p>
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  );
}
