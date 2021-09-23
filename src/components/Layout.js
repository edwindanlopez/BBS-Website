import React from "react";
import Seo from "../components/Seo";
import "twin.macro";

import Nav from "./Nav";
import Footer from "./Footer";

import GlobalStyles from "../styles/GlobalStyles";

export default function Layout({ children, seoTitle, ...props }) {
  return (
    <div {...props}>
      <Seo title={seoTitle} />
      <GlobalStyles />
      <Nav />
      <main tw='mx-auto sm:mx-auto'>{children}</main>
      <Footer />
    </div>
  );
}
