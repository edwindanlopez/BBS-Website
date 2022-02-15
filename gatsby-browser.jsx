import React from 'react';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const wrapRootElement = ({ element }) => (
  <GoogleReCaptchaProvider reCaptchaKey={process.env.RECAPTCHA_SITE_KEY}>
    {element}
  </GoogleReCaptchaProvider>
);

export default wrapRootElement;
