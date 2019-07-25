require('dotenv').config();
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { validateEmail } = require('../services/validationChain');
const {
  findUserByEmail,
  findUserByToken,
} = require('../services/userFunctions');
const saltRounds = 12;

//POST /api/forgotpassword - status: 200 - finds user by email if the exist creates password reset token and sends customer reset password email.
router.post('/forgotpassword', validateEmail, async (req, res, _next) => {
  const { email } = req.body;
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
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });
    const passwordResetLink = `http://localhost:5000/api/reset/${token}`;
    const mailOptions = {
      from: 'recommendItBot@gmail.com',
      to: `${user.email}`,
      subject: 'Link to Reset Password',
      text: `You're receiving this e-mail because you requested a password reset for your RecommendIt account.

      Please click on the link below to choose a new password.
      ${passwordResetLink} 
       `,
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

//GET /api/reset - status: 200 - finds user by password reset token, if the token exists on the query param user can proceed to reset their password.
router.get('/reset', async (req, res, _next) => {
  const { resetPasswordToken } = req.query;
  const user = await findUserByToken(resetPasswordToken);
  if (!user) {
    console.log('password reset link is invalid or expired');
    res.status(400).json('password reset link is invalid or expired');
  } else {
    res.status(200).json({
      email: user.email,
      message: 'password reset link successful',
    });
  }
});

//PUT /api/updatepassword - status: 200 - finds user by email, hashes password, inserts it into DB, resets token & expiration to null

router.put('/updatepassword', async (req, res, _next) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (user) {
    const { password } = req.body;
    bcrypt
      .hash(password, saltRounds)
      .then(hashedPassword => {
        user.update({
          password: hashedPassword,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        });
      })
      .then(() => {
        console.log('password updated');
        res.status(200).json({ message: 'password updated successfully!' });
      });
  } else {
    res
      .status(400)
      .json({ message: 'No user exists in our database to update' });
  }
});

module.exports = router;