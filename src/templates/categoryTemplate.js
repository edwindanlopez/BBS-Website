import React from "react";
import { Link, graphql } from "gatsby";
import "twin.macro";

import Layout from "../components/Layout";
import HomePageWrapper from "../components/layoutWrappers/HomePageWrapper";
import WorkTiles from "../components/WorkTiles";
import CategoryFilter from "../components/categories/CategoryFilter";

const categoryTemplate = ({ data, pageContext }) => {
  console.log("Incoming data nodes: ", data);
  const nodes = data.allMdx.nodes;

  return (
    <Layout seoTitle='Work'>
      <HomePageWrapper>
        <CategoryFilter nodes={nodes} />
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
                  {node.frontmatter.tags.map((tag, i) => {
                    return (
                      <div
                        tw='backgroundColor[rgb(194 220 208 / 51%)] pl-3 pr-3 ml-3 rounded-sm'
                        key={i}
                      >
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

// render all "posts/images" for a specific category only
// want to have access to all other categories for user to cycle between them
// need render feat. images just like in work page

export const query = graphql`
  query CategoryPage($category: String, $postsLimit: Int!, $postsOffset: Int!) {
    allMdx(
      limit: $postsLimit
      skip: $postsOffset
      filter: { frontmatter: { category: { eq: $category } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
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

export default categoryTemplate;
