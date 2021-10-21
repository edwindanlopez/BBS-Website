import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";
import Facebook from "./Facebook";
import Twitter from "./Twitter";

import siteFeatImage from "../../images/bbs-build-beautiful-spaces.jpg";
import siteLogo from "../../images/bbs-logo-horizontal-black-sm.png";

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        titleAlt
        defaultHeadline: headline
        logo
        siteLanguage
        ogLanguage
        facebook
      }
    }
  }
`;

const SEO = ({ title, headline, description, image, article, meta = [] }) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(query);

  // destructure our query
  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    titleAlt,
    defaultHeadline,
    logo,
    siteLanguage,
    ogLanguage,
    facebook,
  } = site.siteMetadata;

  // asign to the props coming in, otherwise use the default value
  const seo = {
    title: title || defaultTitle,
    titleTemplate: `%s · ${defaultTitle}`,
    headline: headline || defaultHeadline,
    description: description || defaultDescription,
    image: siteFeatImage,
    url: `${siteUrl}${pathname}`,
  };

  // return meta tags
  return (
    <>
      <Helmet
        title={seo.title}
        titleTemplate={seo.titleTemplate}
        htmlAttributes={{ lang: `en` }}
        meta={[
          seo.title && {
            property: "og:title",
            content: `${seo.title}`,
          },
          {
            property: "og:titleAlt",
            content: titleAlt,
          },
          seo.description && {
            property: "og:description",
            content: `${seo.description}`,
          },
          {
            property: "og:headline",
            content: `${seo.headline}`,
          },
          seo.image && {
            property: "og:image",
            content: `${seo.image}`,
          },
          seo.url && {
            property: "og:url",
            content: `${seo.url}`,
          },
          {
            property: "og:siteLanguage",
            content: siteLanguage,
          },
          {
            property: "og:logo",
            content: siteLogo,
          },
          article
            ? {
                property: "og:type",
                content: `${article}`,
              }
            : {
                property: "og:type",
                content: "website",
              },
          seo.title && {
            name: "twitter:title",
            content: `${seo.title}`,
          },
          seo.description && {
            name: "twitter:description",
            content: `${seo.description}`,
          },
          seo.image && {
            name: "twitter:image",
            content: `${seo.image}`,
          },
        ].concat(meta)}
      ></Helmet>
      <Facebook
        desc={seo.description}
        image={seo.image}
        title={seo.title}
        type={article ? "article" : "website"}
        url={seo.url}
        locale={ogLanguage}
        name={facebook}
      />
      <Twitter
        title={seo.title}
        image={seo.image}
        desc={seo.description}
        username={null}
      />
    </>
  );
};

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
};

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
};
