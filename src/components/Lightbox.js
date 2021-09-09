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
            tw='relative w-full flex justify-end items-center h-12'
          >
            <button
              className='close-button'
              onClick={close}
              tw='text-white mr-4 text-4xl'
            >
              <span aria-hidden>×</span>
            </button>
          </div>
          <div className='img-overlay-wrapper' tw='w-full'>
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
