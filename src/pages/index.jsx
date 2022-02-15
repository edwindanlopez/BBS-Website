import * as React from 'react';
import Layout from '../components/layoutWrappers/Layout';

import TopHero from '../components/TopHero';
import FeaturedCategories from '../components/categories/FeaturedCategories';
import FeaturedWork from '../components/featuredWork';
import ImgUploadSection from '../components/imgUploadSection';
import OtherProjects from '../components/otherProjects';
import CtaTiles from '../components/ctaTiles';

const sectionStyles = {
  paddingTop: '4rem',
};

function IndexPage() {
  return (
    <Layout seoTitle="Home">
      <div tw="block">
        <TopHero />
        <section>
          <FeaturedCategories />
        </section>
        <section
          style={{
            paddingTop: '1rem',
          }}
        >
          <FeaturedWork />
        </section>
        <section style={sectionStyles}>
          <OtherProjects />
        </section>
        <section style={sectionStyles}>
          <ImgUploadSection />
        </section>
        <section style={sectionStyles}>
          <CtaTiles />
        </section>
      </div>
    </Layout>
  );
}

export default IndexPage;
