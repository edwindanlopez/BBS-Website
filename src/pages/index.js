import * as React from "react";
import Layout from "../components/Layout";
import "twin.macro";

import TopHero from "../components/TopHero";
import Categories from "../components/categories";
import Featuredwork from "../components/featuredwork";
import Snapavid from "../components/snapVid";
import Otherprojects from "../components/otherProjects";
import ActivityMap from "../components/activityMap";
import CtaTiles from "../components/ctaTiles";
import HomePageWrapper from "../components/layoutWrappers/HomePageWrapper";

const sectionStyles = {
  paddingTop: "4rem",
};

const IndexPage = () => {
  return (
    <Layout seoTitle={"Home"}>
      <TopHero />
      <HomePageWrapper>
        <section style={sectionStyles}>
          <Categories />
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
          <ActivityMap />
        </section>
        <section style={sectionStyles}>
          <CtaTiles />
        </section>
      </HomePageWrapper>
    </Layout>
  );
};

export default IndexPage;
