import React from 'react';
import { Link } from 'gatsby';
import logo from '../images/bbs-logo.svg';
import 'twin.macro';

export default function Logo() {
  return (
    <div tw="w-full flex justify-center sm:justify-start">
      <Link to="/">
        <img id="logo" src={logo} alt="BBS-Logo" tw="w-36" />
      </Link>
    </div>
  );
}
