import React from "react";
import logo from "../images/bbs-logo.svg";
import "twin.macro";
import { Link } from "gatsby";

export default function Logo() {
  return (
    <div tw='w-full flex justify-center sm:justify-start'>
      <Link to='/'>
        <img id='logo' src={logo} alt='BBS-Logo' tw='w-36' />
      </Link>
    </div>
  );
}
