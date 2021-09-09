import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import "twin.macro";

export default function Work({ data }) {
  const nodes = data.allMdx.nodes;

  return (
    <div tw='flex overflow-x-scroll'>
      {nodes.map((el) => {
        const image = getImage(el.frontmatter.hero_image);
        return (
          <div tw='mr-4' key={el.id}>
            <Link to={`/work/${el.slug}`}>
              <GatsbyImage
                tw='relative w-72 h-72 object-cover object-center bg-neutral rounded-md'
                image={image}
                alt={el.frontmatter.hero_image_alt}
              />
              <h3 tw='w-full text-left mt-2.5 mb-2'>{el.frontmatter.title}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
