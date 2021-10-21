import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import tw from "twin.macro";

import Logo from "../components/Logo";
import PageLayoutWrapper from "./layoutWrappers/PageLayoutWrapper";

const navItems = [
  {
    name: "Home",
    slug: "/",
  },
  {
    name: "About Us",
    slug: "/about/",
  },
  {
    name: "Work",
    slug: "/work/",
  },
  {
    name: "Contact Us",
    slug: "/contact/",
  },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect((event) => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header tw='sticky top-0 z-30'>
      <MobileDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
      <nav tw='h-24 pt-4 backgroundColor[rgb(255 255 255 / 90%)]'>
        <PageLayoutWrapper>
          <div
            className='nav-wrapper'
            tw='h-full flex justify-between items-center'
          >
            <Logo />
            <div
              className='nav-items'
              tw='hidden sm:flex sm:justify-between sm:content-end sm:width[65rem]'
            >
              {navItems.map((el) => {
                return (
                  <ul key={el.name}>
                    <li tw='text-right text-mildGray font-semibold ml-8'>
                      <Link to={el.slug}>{el.name}</Link>
                    </li>
                  </ul>
                );
              })}
            </div>

            {/* Responsive mobile nav Icon - shows only sm and below */}
            <div
              className='mobile-icon'
              css={[
                tw`absolute right-0 m-6 sm:hidden`,
                scrollPosition >= 100 && tw`mt-0`,
              ]}
            >
              <button onClick={() => setIsOpen(true)}>
                <svg xmlns='http://www.w3.org/2000/svg' width='25' height='12'>
                  <g
                    data-name='Group 11'
                    fill='none'
                    stroke='#b85f53'
                    strokeWidth='2'
                  >
                    <path data-name='Line 1' d='M0 1h25' />
                    <path data-name='Line 2' d='M0 11h25' />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </PageLayoutWrapper>
      </nav>
    </header>
  );
}

const MobileDrawer = ({ isOpen, setIsOpen }) => (
  <div
    className='mobile-drawer'
    css={[
      tw`hidden`,
      isOpen &&
        tw`inline-block absolute top-0 z-30 w-full min-h-screen bg-white opacity-90 p-4`,
    ]}
  >
    <MobileNav closeOpen={setIsOpen} />
    <div tw='relative w-3/4 mx-auto text-center top-14'>
      <ul tw='text-3xl text-mildGray font-semibold'>
        {navItems.map((el) => {
          return (
            <div key={el.name}>
              <li tw='mt-8 mb-8'>
                <Link to={el.slug}>{el.name}</Link>
              </li>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='26'
                height='3'
                viewBox='0 0 26 3'
                tw='mx-auto md:hidden'
              >
                <line
                  id='Line_3'
                  data-name='Line 3'
                  x2='26'
                  transform='translate(0 1.5)'
                  fill='none'
                  stroke='#b85f53'
                  strokeWidth='3'
                />
              </svg>
            </div>
          );
        })}
      </ul>
    </div>
  </div>
);

const MobileNav = ({ closeOpen }) => (
  <div>
    <div className='icon-holder' tw='absolute right-0 mr-4'>
      <button
        onClick={() => closeOpen(false)}
        tw='p-1.5 hover:bg-gray-200 hover:rounded-md'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='19.999'
          height='20'
          viewBox='0 0 19.999 20'
        >
          <path
            id='Path_49'
            data-name='Path 49'
            d='M29.6,27.671,21.928,20,29.6,12.327A1.364,1.364,0,0,0,27.671,10.4L20,18.071,12.328,10.4A1.364,1.364,0,0,0,10.4,12.327L18.071,20,10.4,27.671A1.364,1.364,0,0,0,12.327,29.6L20,21.927,27.671,29.6A1.364,1.364,0,0,0,29.6,27.671Z'
            transform='translate(-10 -9.999)'
            fill='#b85f53'
          />
        </svg>
      </button>
    </div>
  </div>
);
