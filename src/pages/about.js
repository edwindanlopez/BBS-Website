import * as React from "react";
import Layout from "../components/Layout";
import HomePageWrapper from "../components/layoutWrappers/HomePageWrapper";

const AboutPage = () => {
  return (
    <Layout seoTitle={"About"}>
      <HomePageWrapper>
        <h1>About Us</h1>
        <p>This is the about us page</p>
      </HomePageWrapper>
    </Layout>
  );
};

export default AboutPage;
