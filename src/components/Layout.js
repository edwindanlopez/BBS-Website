import React from "react";
import Seo from "../components/Seo";
import "twin.macro";

import Nav from "./Nav";
import Footer from "./Footer";

import GlobalStyles from "../styles/GlobalStyles";

export default function Layout({ children, seoTitle, ...rest }) {
  return (
    <div {...rest}>
      <Seo title={seoTitle} />
      <GlobalStyles />
      <Nav />
      <main tw='mx-auto mb-16 sm:mx-auto'>{children}</main>
      <Footer />
    </div>
  );
}
