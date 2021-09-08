import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function Lightbox({ node }) {
  console.log("Node: ", node);
  const image = getImage(node.childImageSharp.gatsbyImageData);
  return (
    <div>
      <GatsbyImage image={image} alt={node.name} />
    </div>
  );
}
