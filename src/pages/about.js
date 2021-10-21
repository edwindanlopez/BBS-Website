import * as React from "react";
import Layout from "../components/layoutWrappers/Layout";
import { StaticImage } from "gatsby-plugin-image";
import "twin.macro";

import PageLayoutWrapper from "../components/layoutWrappers/PageLayoutWrapper";
import Tile from "../components/ctaTiles/Tile";
import ImageCard from "../components/lib/ImageCard";

const AboutPage = () => {
  return (
    <Layout seoTitle={"About"}>
      <div className='about-page-container' tw='mb-20'>
        <div id='top-hero' tw='flex items-center h-96' style={{ zIndex: "-1" }}>
          <div
            id='hero-img'
            tw='w-full h-full overflow-hidden'
            style={{ zIndex: "-1" }}
          >
            <StaticImage
              alt='BBS Hero image of beautiful refurnished white kitchen cabinet'
              src='../images/bbs-about-us-top-hero-image.jpg'
              tw='w-full h-full object-cover object-center transform'
            />
          </div>
        </div>
        <PageLayoutWrapper>
          <div tw='mt-8 w-full 2xl:(w-3/4 mx-auto)'>
            <div>
              <h1 tw='text-dark mb-8 lg:(mt-14 fontSize[2.15rem] lineHeight[3.15rem])'>
                BBS exists with the purpose of creating and transforming
                interior spaces that will add value, functionality and beauty to
                your home.
              </h1>
              <h2 tw='mb-8 lg:(fontSize[1.75rem] lineHeight[2rem] mt-14 mb-14)'>
                Our areas of specialization are four:
              </h2>
            </div>
            <div tw='mt-8 sm:grid sm:grid-cols-2 sm:gap-4'>
              <ImageCard
                title='Tiling'
                categoryLink={`/category/bathroom/`}
                paragraph='As in backsplash installation, wall accents and full bathroom
                    remodeling (we don’t do full tile-flooring).'
              >
                <StaticImage
                  src='https://res.cloudinary.com/bldrscove/image/upload/v1634746458/BBS/Website-Assets/about-images/bbs-tiling_ymsu0g.webp'
                  alt='Beautiful gray slate shower tile'
                />
              </ImageCard>
              <ImageCard
                title='Carpentry'
                categoryLink={`/category/closet/`}
                paragraph='As in closet renovations, wainscoting, window trimming,
                  baseboard and crown-molding installations and construction of
                  wooden structures that will add functionality to empty spaces
                  in the house.'
              >
                <StaticImage
                  src='https://res.cloudinary.com/bldrscove/image/upload/v1634746458/BBS/Website-Assets/about-images/bbs-carpentry_d4eqxt.webp'
                  alt='Sawdust flying out of a hand router being used by a carpenter'
                />
              </ImageCard>
              <ImageCard
                title='Wood Restoration'
                categoryLink={`/category/restoration/`}
                paragraph='As in damaged panels on RVs or pieces of valuable furniture
                  that need to be refinished.'
              >
                <StaticImage
                  src='https://res.cloudinary.com/bldrscove/image/upload/v1634746458/BBS/Website-Assets/about-images/bbs-wood-restoration_irp7kr.webp'
                  alt='Faded chair in the process of being sanded during restoration'
                />
              </ImageCard>
              <ImageCard
                title='Artistic touchups or full decoration'
                categoryLink={`/category/artistic/`}
                paragraph='As in murals or artistic artwork on walls or furniture.'
              >
                <StaticImage
                  src='https://res.cloudinary.com/bldrscove/image/upload/v1634746458/BBS/Website-Assets/about-images/bbs-artistic-touchups_koz3uu.webp'
                  alt='Artistic wall decore texture'
                />
              </ImageCard>
            </div>
            <Tile link={`/contact/`} tileColor='orangeAmber' tw='mt-8 mb-8'>
              <h3 tw='text-white'>Contact Us</h3>
            </Tile>
          </div>
        </PageLayoutWrapper>
      </div>
    </Layout>
  );
};

export default AboutPage;
