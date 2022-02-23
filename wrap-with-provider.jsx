import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function wrapWithProvider({ element }) {
  // following gatsby guide on implementing
  // wrapRootElement for both SSR and gatsby-browser
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.RECAPTCHA_SITE_KEY}>
      {element}
    </GoogleReCaptchaProvider>
  );
}
