import * as React from "react";
import Layout from "../../components/Layout";
import { Link, graphql } from "gatsby";

const Work = ({ data }) => {
  return (
    <Layout seoTitle='Work'>
      <h1>Our featured work</h1>
      <p>Below, you'll find our latest work. Enjoy!</p>
      <br />
      {data.allMdx.nodes.map((node) => (
        <article key={node.id}>
          <h2>
            <Link to={`/work/${node.slug}`}>{node.frontmatter.title}</Link>
          </h2>
          <p>Location: {node.frontmatter.location}</p>
          <p>Posted: {node.frontmatter.date}</p>
          <br />
        </article>
      ))}
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
        }
        id
        slug
      }
    }
  }
`;

export default Work;
