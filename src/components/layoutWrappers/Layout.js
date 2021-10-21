import React from "react";
import SEO from "../Seo/index";
import "twin.macro";
import Nav from "../Nav";
import Footer from "../Footer";
import GlobalStyles from "../../styles/GlobalStyles";

export default function Layout({ children, seoTitle, ...props }) {
  return (
    <div {...props} tw='flex flex-col min-h-screen'>
      <SEO title={seoTitle} />
      <GlobalStyles />
      <Nav />
      <main tw='w-full mx-auto flex flex-col flex-auto justify-between'>
        {children}
      </main>
      <Footer />
    </div>
  );
}
