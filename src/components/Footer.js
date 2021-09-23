import React from "react";
import "twin.macro";

import footerLogo from "../images/BBS-Footer-Logo.svg";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer tw='w-full pt-8 pb-4 bg-beige static bottom-0'>
      <div tw='flex flex-wrap justify-center items-center'>
        <img
          id='footer-logo'
          src={footerLogo}
          alt='BBS Footer Logo'
          tw='mb-1'
        />
        <div className='break'></div>
        <small tw='text-center mt-2'>
          {`© ${currentYear} Build Beautiful Spaces LLC. All Rights Reserved.`}
        </small>
      </div>
    </footer>
  );
}
