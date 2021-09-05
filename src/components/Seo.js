import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl: url
        defaultImage: image
      }
    }
  }
`;

const SEO = ({ title, description, image, article, meta = [] }) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(query);

  // destructure our query
  const { defaultTitle, defaultDescription, siteUrl, defaultImage } =
    site.siteMetadata;

  // asign to the props coming in, otherwise use the default value
  const seo = {
    title: title || defaultTitle,
    titleTemplate: `%s · ${defaultTitle}`,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  // return meta tags
  return (
    <Helmet
      title={seo.title}
      titleTemplate={seo.titleTemplate}
      htmlAttributes={{ lang: `en` }}
      meta={[
        seo.title && {
          property: "og:title",
          content: `${seo.title}`,
        },
        seo.description && {
          property: "og:description",
          content: `${seo.description}`,
        },
        seo.image && {
          property: "og:image",
          content: `${seo.image}`,
        },
        seo.url && {
          property: "og:url",
          content: `${seo.url}`,
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
        {
          name: "description",
          content: `${seo.description}`,
        },
        {
          name: "image",
          content: `${seo.image}`,
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
