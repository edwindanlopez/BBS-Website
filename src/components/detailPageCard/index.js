import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import "twin.macro";

export default function DetailPageCard(mdx) {
  console.log("Incoming props: ", mdx);
  return (
    <div className='card-holder' tw='bg-red-500'>
      <h3>{mdx.frontmatter.title}</h3>
      <h3>{mdx.frontmatter.subhead}</h3>
      <h3>{mdx.frontmatter.location}</h3>
      <h3>{mdx.frontmatter.date}</h3>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </div>
  );
}
