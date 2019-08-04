const nodemailer = require('nodemailer');
require('dotenv').config();

// Nodemailer function to send email to email address if valid.

exports.sendEmail = (mailOptions, successfulMessage) => {
  const creds = {
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  };
  const transporter = nodemailer.createTransport(creds);

  transporter
    .sendMail(mailOptions, (err, response) => {
      if (response) {
        console.log('Sending Email');
        console.log(response);
        res.status(200).json(successfulMessage);
      } else {
        console.error(`There was an error: ${err}`);
      }
    })
    .catch(err => console.log(err));
};
