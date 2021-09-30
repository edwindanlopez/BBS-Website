const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const fetchSendGrid = (req, res) => {
  sendgrid
    .send({
      personalizations: [
        {
          to: [
            {
              email: req.body.email,
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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        city: req.body.city,
        message: req.body.message,
        methodOfContact: req.body.contactMethod,
        phone: req.body.phone,
        subject: req.body.subject,
        attachment: {
          content: req.body.file.base64Url,
          filename: req.body.file.filename,
          size: req.body.file.size,
          type: req.body.file.type,
        },
      },
      attachments: [
        {
          content: req.body.file.base64Url,
          filename: req.body.file.filename,
          type: req.body.file.type,
          disposition: "attachment",
          content_id: "form-image-attachement",
        },
      ],
    })
    .then(() => {
      res
        .status(200)
        .json({
          location: "From within the sendgrid funcion",
          success: true,
          message: "Email sent",
        })
        .end();
    })
    .catch((error) => {
      console.log("Error on sendEmail Function: ", error);
      console.log("Error body: ", error.response.body);
      res.status(500).json({
        location: "From within the sendgrid funcion",
        success: false,
        message: `Server error: ${error}`,
      });
    });
};

module.exports = fetchSendGrid;