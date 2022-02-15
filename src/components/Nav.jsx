import React, { useState, useEffect, useRef } from 'react';
import { Link, navigate } from 'gatsby';
import tw from 'twin.macro';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

import Logo from './Logo';
import PageLayoutWrapper from './layoutWrappers/PageLayoutWrapper';

const navItems = [
  {
    name: 'Home',
    slug: '/',
  },
  {
    name: 'About Us',
    slug: '/about/',
  },
  {
    name: 'Work',
    slug: '/work/',
  },
  {
    name: 'Contact Us',
    slug: '/contact/',
  },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [nav, setNav] = useState({
    opacity: 1,
    y: 0,
  });

  const lastPosition = useRef(0);

  const toggleMobileDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const navigateMobileLink = (elSlug) => {
    navigate(`${elSlug}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.screen.width <= 638 &&
        window.scrollY > 250 &&
        window.scrollY > lastPosition
      ) {
        // hide nav
        setNav({
          opacity: 0,
          y: -150,
        });
      } else {
        setNav({
          opacity: 1,
          y: 0,
        });
      }

      lastPosition.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const variants = {
    hidden: {
      opacity: nav.opacity,
      y: nav.y,
    },
    visible: {
      opacity: nav.opacity,
      y: nav.y,
    },
  };

  return (
    <header tw="sticky top-0 z-30">
      <MobileDrawer
        isOpen={isOpen}
        toggleMobileDrawer={toggleMobileDrawer}
        navigateMobileLink={navigateMobileLink}
      />
      <motion.nav
        initial="visible"
        animate="hidden"
        transition={{ ease: 'easeOut', duration: 0.25 }}
        variants={variants}
        css={[tw`flex items-center bg-[rgba(255, 255, 255, 0.90)]`]}
      >
        <div
          className="nav-wrapper"
          tw="relative w-full p-4 flex justify-between items-center"
        >
          <PageLayoutWrapper tw="flex justify-center items-center">
            <>
              <Logo />
              <div
                className="nav-items"
                tw="hidden sm:flex sm:justify-between sm:content-end sm:width[65rem]"
              >
                {navItems.map((el) => (
                  <ul key={el.name}>
                    <li tw="text-right text-mildGray font-semibold ml-8">
                      <Link to={el.slug}>{el.name}</Link>
                    </li>
                  </ul>
                ))}
              </div>
              <div
                className="mobile-nav-icon"
                css={[tw`absolute right-0 mr-6 sm:hidden`]}
              >
                <button type="button" onClick={() => toggleMobileDrawer()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="12"
                  >
                    <g
                      data-name="Group 11"
                      fill="none"
                      stroke="#b85f53"
                      strokeWidth="2"
                    >
                      <path data-name="Line 1" d="M0 1h25" />
                      <path data-name="Line 2" d="M0 11h25" />
                    </g>
                  </svg>
                </button>
              </div>
            </>
          </PageLayoutWrapper>
        </div>
      </motion.nav>
    </header>
  );
}

function MobileDrawer({ isOpen, toggleMobileDrawer, navigateMobileLink }) {
  useEffect(() => {
    if (isOpen && document.body.className !== 'freeze-body') {
      document.body.classList.add('freeze-body');
    }

    return () => document.body.removeAttribute('class');
  });
  return (
    <div
      className="mobile-drawer"
      css={[
        tw`hidden`,
        isOpen &&
          tw`inline-block absolute top-0 z-30 w-full min-h-screen bg-white opacity-90 p-4`,
      ]}
    >
      <CloseMobileNavIcon toggleMobileDrawer={toggleMobileDrawer} />
      <div tw="relative w-3/4 mx-auto text-center top-14">
        <ul>
          {navItems.map((el) => (
            <div key={el.name}>
              <li tw="mt-8 mb-8">
                <div
                  onClick={() => navigateMobileLink(el.slug)}
                  onKeyUp={() => navigateMobileLink(el.slug)}
                  role="presentation"
                >
                  <p tw="text-3xl text-mildGray font-semibold">{el.name}</p>
                </div>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="3"
                viewBox="0 0 26 3"
                tw="mx-auto md:hidden"
              >
                <line
                  id="Line_3"
                  data-name="Line 3"
                  x2="26"
                  transform="translate(0 1.5)"
                  fill="none"
                  stroke="#b85f53"
                  strokeWidth="3"
                />
              </svg>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CloseMobileNavIcon({ toggleMobileDrawer }) {
  return (
    <div>
      <div className="icon-holder" tw="absolute right-0 mr-5 mt-6">
        <button
          type="button"
          onClick={() => toggleMobileDrawer()}
          tw="p-1.5 hover:bg-gray-200 hover:rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19.999"
            height="20"
            viewBox="0 0 19.999 20"
          >
            <path
              id="Path_49"
              data-name="Path 49"
              d="M29.6,27.671,21.928,20,29.6,12.327A1.364,1.364,0,0,0,27.671,10.4L20,18.071,12.328,10.4A1.364,1.364,0,0,0,10.4,12.327L18.071,20,10.4,27.671A1.364,1.364,0,0,0,12.327,29.6L20,21.927,27.671,29.6A1.364,1.364,0,0,0,29.6,27.671Z"
              transform="translate(-10 -9.999)"
              fill="#b85f53"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

MobileDrawer.propTypes = {
  isOpen: PropTypes.bool,
  toggleMobileDrawer: PropTypes.func,
  navigateMobileLink: PropTypes.func,
};

MobileDrawer.defaultProps = {
  isOpen: false,
  toggleMobileDrawer: () => {},
  navigateMobileLink: () => {},
};

CloseMobileNavIcon.propTypes = {
  toggleMobileDrawer: PropTypes.func,
};

CloseMobileNavIcon.defaultProps = {
  toggleMobileDrawer: () => {},
};
