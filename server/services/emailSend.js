const nodemailer = require('nodemailer');
require('dotenv').config();
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// setting up our Oauth2 Client

const oauth2Client = new OAuth2(
  `${process.env.GOOGLE_MAIL_CLIENT_ID}`,
  `${process.env.GOOGLE_MAIL_CLIENT_SECRET}`,
  'https://developers.google.com/oauthplayground'
);

// Setting up refresh token Creds

oauth2Client.setCredentials({
  refresh_token: `${process.env.REFRESH_TOKEN}`,
});

// getting out access token with all our information

const accessToken = oauth2Client.getAccessToken();

// Nodemailer function to send email to email address if valid.

exports.sendEmail = (mailOptions, successfulMessage) => {
  const creds = {
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: `${process.env.EMAIL_ADDRESS}`,
      clientId: `${process.env.GOOGLE_MAIL_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_MAIL_CLIENT_SECRET}`,
      refreshToken: `${process.env.REFRESH_TOKEN}`,
      accessToken: accessToken,
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
