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

const IndexPage = () => {
  return (
    <Layout seoTitle={"Home"}>
      <header>
        <TopHero />
      </header>
      <section tw='pt-8 mx-auto'>
        <Categories />
        <Featuredwork />
        <Snapavid />
        <Otherprojects />
        <ActivityMap />
        <CtaTiles />
      </section>
    </Layout>
  );
};

export default IndexPage;
