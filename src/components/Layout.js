import React from "react";
import Seo from "../components/Seo";
import "twin.macro";

import Nav from "./Nav";
import LayoutWrapper from "./layoutWrappers/LayoutWrapper";
import Footer from "./Footer";

import GlobalStyles from "../styles/GlobalStyles";

export default function Layout({ children, seoTitle, ...rest }) {
  return (
    <div {...rest}>
      <Seo title={seoTitle} />
      <GlobalStyles />
      <Nav />
      <LayoutWrapper>
        <main tw='mx-auto sm:mx-auto sm:max-w-screen-sm mb-16'>{children}</main>
      </LayoutWrapper>
      <Footer />
    </div>
  );
}
