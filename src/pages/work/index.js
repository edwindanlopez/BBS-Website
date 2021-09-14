import * as React from "react";
import Layout from "../../components/Layout";
import { Link, graphql } from "gatsby";
import "twin.macro";

import HomePageWrapper from "../../components/layoutWrappers/HomePageWrapper";
import WorkTiles from "./WorkTiles";

const Work = ({ data }) => {
  const nodes = data.allMdx.nodes;
  console.log("Data from parent container: ", data);

  return (
    <Layout seoTitle='Work'>
      <HomePageWrapper>
        <h1>Our featured work</h1>
        <p>Below, you'll find our latest work. Enjoy!</p>
        <br />
        {nodes.map((node) => {
          return (
            <div className='work-collection' key={node.id} tw='mt-10'>
              <div>
                <h2 tw='mt-4 mb-4'>{node.frontmatter.title}</h2>
                <WorkTiles node={node} />
              </div>
              <div tw='flex justify-between items-center'>
                <h3 tw='text-mildgray mt-4 mb-2'>
                  {node.frontmatter.location}
                </h3>
                <div tw='flex justify-end items-center'>
                  {node.frontmatter.tags.map((tag) => {
                    return (
                      <div tw='backgroundColor[rgb(194 220 208 / 51%)] pl-3 pr-3 ml-3 rounded-sm'>
                        <p tw='fontSize[10px] uppercase tracking-wider font-semibold text-mildgray'>
                          {tag}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <p tw='text-ltgray'>{node.excerpt}</p>
              <Link to={`/work/${node.slug}`} tw='h-96'>
                <p tw='text-sm font-semibold text-orangeAmber mt-2'>
                  Learn more
                </p>
              </Link>
            </div>
          );
        })}
      </HomePageWrapper>
    </Layout>
  );
};

export const query = graphql`
  query queryWork {
    allMdx(sort: { order: DESC, fields: frontmatter___date }) {
      nodes {
        frontmatter {
          title
          location
          date
          featured_images {
            id
            childImageSharp {
              gatsbyImageData
              id
            }
          }
          tags
        }
        id
        slug
        body
        excerpt(pruneLength: 75)
      }
    }
  }
`;

export default Work;
