import React from "react";
import { Link } from "gatsby";
import "twin.macro";

import Layout from "../components/layoutWrappers/Layout";
import PageLayoutWrapper from "../components/layoutWrappers/PageLayoutWrapper";
import WorkTiles from "../components/WorkTiles";
import CategoryFilter from "../components/categories/CategoryFilter";
import Tags from "../components/Tags";
import carrotArrow from "../images/carrot-arrow.svg";
import Pagination from "../components/Pagination";

const WorkAll = ({
  pageContext: { edges, category, allCategories, numPages, ...rest },
}) => {
  return (
    <Layout seoTitle='Work'>
      <PageLayoutWrapper>
        <CategoryFilter allCategories={allCategories} category={category} />
        {edges.map((edgeNode) => {
          if (edgeNode) {
            const node = edgeNode.node;
            return (
              <div className='work-collection' key={node.id} tw='mt-10 mb-14'>
                <div>
                  <h2 tw='mt-4 mb-4'>{node.frontmatter.title}</h2>
                  <WorkTiles node={node} />
                </div>
                <div tw='flex justify-between items-center'>
                  <h3 tw='text-mildGray mt-4 mb-2'>
                    {node.frontmatter.location}
                  </h3>
                  <Tags tags={node.frontmatter.tags} />
                </div>
                <p tw='text-lightGray'>{node.excerpt}</p>
                <Link to={`/work/${node.slug}`} tw='h-96'>
                  <span tw='flex items-center mt-2'>
                    <p tw='text-sm font-semibold text-orangeAmber'>View more</p>
                    <img
                      src={carrotArrow}
                      alt='carrot-arrow'
                      tw='ml-2 height[7px] transform[rotateZ(-90deg)]'
                    />
                  </span>
                </Link>
              </div>
            );
          }
          return "";
        })}
        <div tw='sticky bottom-6 z-10 mb-12'>
          <Pagination pages={numPages} {...rest} />
        </div>
      </PageLayoutWrapper>
    </Layout>
  );
};

export default WorkAll;
