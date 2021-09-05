import React from "react";
import logo from "../images/Logo.svg";
import "twin.macro";

export default function Logo() {
  return (
    <div tw='flex justify-center m-6 sm:justify-start'>
      <img id='logo' src={logo} alt='BBS Logo' tw='w-44' />
    </div>
  );
}
