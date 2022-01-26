require("dotenv").config();
const axios = require("axios").default;
const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
  "Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async (event, context) => {
  const sendToSendGrid = new Promise(async (resolve, reject) => {
    // parse incoming req data
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

    if (!token) {
      return {
        statusCode: 401,
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          success: false,
          message:
            "There was a problem with the recaptcha in your request. Please try again later.",
        }),
      };
    }

    const captchaRes = await axios.post(verificationUrl);
    const captcha = captchaRes.data;
    console.log("Recaptcha response: ", captcha);

    if (captcha.success || captcha.score > 0.4) {
      sendgrid
        .send({
          personalizations: [
            {
              to: [
                {
                  email: email,
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
            name: "Build Beautiful Spaces",
            email: `${process.env.SENDGRID_VERIFIED_SENDER}`,
          },
          subject: "BBS - Thanks for reaching out!",
          templateId: `${process.env.TEMPLATE_ID_CONTACT_PAGE}`,
          dynamic_template_data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            city: city,
            message: message,
            methodOfContact: contactMethod,
            phone: phone,
            subject: subject,
            files: files,
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject(captcha["error-codes"][0]);
    }
  });

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
    };
  } else if (event.httpMethod === "POST") {
    return sendToSendGrid
      .then((res) => {
        return {
          statusCode: res[0].statusCode,
          headers: {
            ...CORS_HEADERS,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            success: true,
            message: "Email sent",
          }),
        };
      })
      .catch((error) => {
        return {
          statusCode: error.code,
          body: JSON.stringify({
            success: false,
            error: error.message,
            message: error.response.body.errors[0].message,
          }),
        };
      });
  }
  return {
    statusCode: 500,
    body: JSON.stringify("Only accepting POST requests"),
  };
};
