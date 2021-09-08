import React from "react";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from "../../components/Layout";
import WorkDetailPageWrapper from "../../components/layoutWrappers/WorkDetailPageWrapper";
import DetailPageCard from "../../components/detailPageCard";
import Lightbox from "../../components/Lightbox";

const WorkDetailPage = ({ data }) => {
  //TODO: implement lightbox when user clicks images

  // console.log(data);

  return (
    <Layout seoTitle={data.mdx.frontmatter.title}>
      <WorkDetailPageWrapper>
        <div className='container'>
          <div className='work-images'>
            {data.allFile.nodes.map((node) => {
              return <Lightbox node={node} key={node.childImageSharp.id} />;
            })}
          </div>

          <DetailPageCard {...data.mdx} />
        </div>
      </WorkDetailPageWrapper>
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
        extension: { regex: "/(jpe?g|png|gif)/" }
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
        name
      }
    }
  }
`;

export default WorkDetailPage;
