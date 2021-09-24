import React from "react";
import Seo from "../components/Seo";
import "twin.macro";

import Nav from "./Nav";
import Footer from "./Footer";

import GlobalStyles from "../styles/GlobalStyles";

export default function Layout({ children, seoTitle, ...props }) {
  return (
    <div {...props} tw='flex flex-col min-h-screen'>
      <Seo title={seoTitle} />
      <GlobalStyles />
      <Nav />
      <main tw='w-full mx-auto flex flex-col flex-auto'>{children}</main>
      <Footer />
    </div>
  );
}
