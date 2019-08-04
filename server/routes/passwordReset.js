require('dotenv').config();
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../services/emailSend');
const emailTemplate = require('../services/emailTemplates');
const asyncHandler = require('../services/asyncErrorHanlder');
const { validateEmail } = require('../services/validationChain');
const {
  findUserByEmail,
  findUserByToken,
} = require('../services/userFunctions');
const saltRounds = 12;

//POST /api/forgotpassword - status: 200 - finds user by email if the exist creates password reset token and sends customer reset password email.
router.post(
  '/forgotpassword',
  validateEmail,
  asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
      const token = crypto.randomBytes(20).toString('hex');
      console.log(token);
      user.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 360000,
      });

      const email = user.email;
      const passwordResetLink = `http://localhost:3000/reset/${token}`;

      // email template with reset link and message

      const mailOptions = emailTemplate.passwordReset(email, passwordResetLink);

      successfulMessage = {
        message: 'Recovery Email Sent',
      };

      sendEmail(mailOptions, successfulMessage);
    } else {
      console.log('email not in DB');
      res.status(400).json({
        message: 'Email not in Database',
      });
    }
  })
);

//GET /api/reset - status: 200 - finds user by password reset token, if the token exists on the query param user can proceed to reset their password.
router.get(
  '/reset',
  asyncHandler(async (req, res, _next) => {
    const token = req.query.resetPasswordToken;
    console.log(token);
    const user = await findUserByToken(token);
    console.log(user);
    if (user) {
      user.update({
        resetPasswordToken: null,
        resetPasswordExpires: null,
      });
      res.json({
        email: user.email,
        message: 'successful',
      });
    } else {
      console.log('password reset link is invalid or expired');
      res.json({ error: 'password reset link is invalid or expired' });
    }
  })
);

//PUT /api/updatepassword - status: 200 - finds user by email, hashes password, inserts it into DB, resets token & expiration to null

router.put(
  '/updatepasswordviaemail',
  asyncHandler(async (req, res, _next) => {
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
  })
);

module.exports = router;
