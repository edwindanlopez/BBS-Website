import React from "react";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "../../components/Layout";

const WorkDetailPage = ({ data }) => {
  console.log(data);

  //TODO: implement lightbox when user clicks images
  //TODO: Build out card with project details towards bottom

  return (
    <Layout seoTitle={data.mdx.frontmatter.title}>
      <div className='container'>
        <div className='work-images'>
          {data.allFile.nodes.map((node) => {
            const image = getImage(node.childImageSharp.gatsbyImageData);
            return (
              <div key={node.childImageSharp.id}>
                <GatsbyImage image={image} alt='' />
              </div>
            );
          })}
        </div>

        <div className='card-holder'>
          <h3>{data.mdx.frontmatter.title}</h3>
          <h3>{data.mdx.frontmatter.subhead}</h3>
          <h3>{data.mdx.frontmatter.location}</h3>
          <h3>{data.mdx.frontmatter.date}</h3>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </div>
      </div>
    </Layout>
  );
};

export const getWork = graphql`
  query workDetailPage($slug: String!, $absolutePathSlug: String!) {
    mdx(slug: { eq: $slug }) {
      frontmatter {
        title
        subhead
        location
        date
        client
      }
      body
    }
    allFile(
      filter: {
        extension: { regex: "/(jpg)/" }
        relativeDirectory: { eq: $absolutePathSlug }
      }
      sort: { fields: name, order: ASC }
    ) {
      nodes {
        childImageSharp {
          gatsbyImageData(
            backgroundColor: "#E3E1DF"
            placeholder: DOMINANT_COLOR
          )
          id
        }
      }
    }
  }
`;

export default WorkDetailPage;
