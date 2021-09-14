import * as React from "react";
import Layout from "../components/Layout";
import HomePageWrapper from "../components/layoutWrappers/HomePageWrapper";

const AboutPage = () => {
  return (
    <Layout seoTitle={"Contact"}>
      <HomePageWrapper>
        <h1>Contact Us</h1>
        <p>This is the contact us page</p>
      </HomePageWrapper>
    </Layout>
  );
};

export default AboutPage;
