import * as React from "react";
import Layout from "../components/Layout";
import HomePageWrapper from "../components/layoutWrappers/HomePageWrapper";
import { StaticImage } from "gatsby-plugin-image";
import "twin.macro";

const paragraphStyle = {
  margin: "1rem  0 1rem",
};

const AboutPage = () => {
  return (
    <Layout seoTitle={"About"}>
      <div id='top-hero' tw='flex items-center h-96' style={{ zIndex: "-1" }}>
        <div
          id='hero-img'
          tw='w-full h-full overflow-hidden'
          style={{ zIndex: "-1" }}
        >
          <StaticImage
            alt='BBS Hero image of beautiful refurnished white kitchen cabinet'
            src='../images/BBS-Top-Hero-Image.jpg'
            tw='w-full h-full object-cover object-center transform scale-150'
          />
        </div>
      </div>
      <HomePageWrapper>
        <div tw='mt-8'>
          <h3 tw='text-dark text-xl w-11/12 mb-4'>
            Building beautiful spaces is our way of making people feel good
          </h3>
          <p style={paragraphStyle}>
            Above all, we care about helping people create a space that will
            elevate their life. This begins with the first point of contact, and
            continues even after the project is completed.
          </p>
          <p style={paragraphStyle}>
            Sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
          </p>
          <p style={paragraphStyle}>
            Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div tw='w-full h-40 mt-3 bg-mildgray rounded-md flex justify-center items-center'>
          <h3 tw='text-white'>Contact Us</h3>
        </div>
      </HomePageWrapper>
    </Layout>
  );
};

export default AboutPage;
