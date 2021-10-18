const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
  console.log("Logging parsed body: ", JSON.parse(event.body));
  const {
    firstName,
    lastName,
    email,
    city,
    message,
    contactMethod,
    phone,
    subject,
    file,
  } = JSON.parse(event.body);

  const sendToSendGrid = new Promise((resolve, reject) => {
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
                email: process.env.SENDGRID_VERIFIED_SENDER,
              },
            ],
          },
        ],
        from: {
          name: "Build Beautiful Spaces",
          email: process.env.SENDGRID_VERIFIED_SENDER,
        },
        subject: "BBS - Successfully received your message!",
        templateId: "d-f253696ae1a743a29ffe1b2db6cf8a40",
        dynamic_template_data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          city: city,
          message: message,
          methodOfContact: contactMethod,
          phone: phone,
          subject: subject,
          attachment: {
            content: file.base64Url,
            filename: file.filename,
            size: file.size,
            type: file.type,
          },
        },
        attachments: [
          {
            content: file.base64Url,
            filename: file.filename,
            type: file.type,
            disposition: "attachment",
            content_id: "form-attachement",
          },
        ],
      })
      .then((res) => {
        console.log("Successful Result: ", res);
        resolve({
          statusCode: 200,
          success: true,
          message: "Email sent",
        });
      })
      .catch((error) => {
        console.log("Error in devContactFormSubmission: ", error);
        reject({
          statusCode: 500,
          success: false,
          error: error,
          message: "There was a problem with your request",
        });
      });
  });

  return sendToSendGrid;
};
