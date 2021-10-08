import * as React from "react";
import Layout from "../components/layoutWrappers/Layout";

import TopHero from "../components/TopHero";
import FeaturedCategories from "../components/categories/FeaturedCategories";
import FeaturedWork from "../components/featuredWork";
import ImgUploadSection from "../components/imgUploadSection";
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
          <FeaturedWork />
        </section>
        <section style={sectionStyles}>
          <ImgUploadSection />
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
