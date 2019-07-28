const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmail = (mailOptions, successfulMessage) => {
  const creds = {
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  };
  const transporter = nodemailer.createTransport(creds);
  console.log('Sending Email');
  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error(`There was an error: ${err}`);
    } else {
      console.log(response);
      res.status(200).json(successfulMessage);
    }
  });
};
