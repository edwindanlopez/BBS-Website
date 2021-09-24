import * as React from "react";
import Layout from "../components/Layout";

import TopHero from "../components/TopHero";
import FeaturedCategories from "../components/categories/FeaturedCategories";
import Featuredwork from "../components/featuredwork";
import Snapavid from "../components/snapVid";
import Otherprojects from "../components/otherProjects";
import CtaTiles from "../components/ctaTiles";

const sectionStyles = {
  paddingTop: "4rem",
};

const IndexPage = () => {
  return (
    <Layout seoTitle={"Home"}>
      <div tw='block'>
        <TopHero />
        <section style={sectionStyles}>
          <FeaturedCategories />
        </section>
        <section style={sectionStyles}>
          <Featuredwork />
        </section>
        <section style={sectionStyles}>
          <Snapavid />
        </section>
        <section style={sectionStyles}>
          <Otherprojects />
        </section>
        <section style={sectionStyles}>
          <CtaTiles />
        </section>
      </div>
    </Layout>
  );
};

export default IndexPage;
