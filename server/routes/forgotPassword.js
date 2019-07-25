require('dotenv').config();
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { validateEmail } = require('../services/validationChain');
const { findUserByEmail } = require('../services/userFunctions');

router.post('/forgotpassword', validateEmail, async (req, res, next) => {
  const email = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    console.log('email not in DB');
    res.status(400).json('Email not in DB');
  } else {
    const token = crypto.randomBytes(20).toString('hex');
    console.log(token);
    user.update({
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 360000,
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: ``, // fill in email via env
        password: ``, // fill in password via env
      },
    });

    const mailOptions = {
      from: '', // whatever email I create
      to: `${user.email}`,
      subject: 'Link to Reset Password',
      text: '', // create somthing cool
    };

    console.log('Sending Email');

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error(`There was an error: ${err}`);
      } else {
        console.log(`here is the response: ${response}`);
        res.status(200).json('Recovery Email Sent');
      }
    });
  }
});

module.exports = router;
