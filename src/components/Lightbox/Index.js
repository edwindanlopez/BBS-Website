import React, { useEffect } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import tw from "twin.macro";

import DialogOverlay from "./DialogOverlay";

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
        <DialogOverlay node={node} close={close} showDialog={showDialog} />
      </div>
    </>
  );
}
