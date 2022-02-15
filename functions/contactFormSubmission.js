require('dotenv').config();
const axios = require('axios').default;
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  const {
    firstName,
    lastName,
    email,
    city,
    message,
    contactMethod,
    phone,
    subject,
    files,
    token,
  } = JSON.parse(event.body);
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
  const captchaRes = await axios.post(verificationUrl);
  const captcha = captchaRes.data;
  console.log('Recaptcha response: ', captcha);

  const sendToSendGrid = new Promise((resolve, reject) => {
    if (!token) {
      reject(new Error('Captcha token not validated'));
    }

    if (captcha.success || captcha.score > 0.4) {
      sendgrid
        .send({
          personalizations: [
            {
              to: [
                {
                  email,
                },
              ],
              bcc: [
                {
                  email: `${process.env.SENDGRID_VERIFIED_SENDER}`,
                },
              ],
            },
          ],
          from: {
            name: 'Build Beautiful Spaces',
            email: `${process.env.SENDGRID_VERIFIED_SENDER}`,
          },
          subject: 'BBS - Thanks for reaching out!',
          templateId: `${process.env.TEMPLATE_ID_CONTACT_PAGE}`,
          dynamic_template_data: {
            firstName,
            lastName,
            email,
            city,
            message,
            methodOfContact: contactMethod,
            phone,
            subject,
            files,
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject(captcha['error-codes'][0]);
    }
  });

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
    };
  }
  if (event.httpMethod === 'POST') {
    return sendToSendGrid
      .then((res) => ({
        statusCode: res[0].statusCode,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: true,
          message: 'Email sent',
        }),
      }))
      .catch((error) => ({
        statusCode: error.code,
        body: JSON.stringify({
          success: false,
          error: error.message,
          message: error.response.body.errors[0].message,
        }),
      }));
  }
  return {
    statusCode: 500,
    body: JSON.stringify('Only accepting POST requests'),
  };
};
