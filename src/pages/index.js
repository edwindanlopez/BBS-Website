import * as React from "react";
import Layout from "../components/Layout";
import "twin.macro";

import TopHero from "../components/TopHero";
import FeaturedCategories from "../components/categories/FeaturedCategories";
import Featuredwork from "../components/featuredwork";
import Snapavid from "../components/snapVid";
import Otherprojects from "../components/otherProjects";
import ActivityMap from "../components/ActivityMap";
import CtaTiles from "../components/ctaTiles";
import PageLayoutWrapper from "../components/layoutWrappers/PageLayoutWrapper";

const sectionStyles = {
  paddingTop: "4rem",
};

const IndexPage = () => {
  return (
    <Layout seoTitle={"Home"}>
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
    </Layout>
  );
};

export default IndexPage;
