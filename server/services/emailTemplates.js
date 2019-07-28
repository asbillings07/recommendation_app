const { CLIENT_ORIGIN } = require('../config/Config');

module.exports = {
  confirm: (id, email) => ({
    from: 'recommendItBot@gmail.com',
    to: `${email}`,
    subject: 'React Confirm Email',
    html: `
        <h1> Welcome to RecommendIt! </h1>
        <p>Click the link below to confirm your email </p>
        <a href='${CLIENT_ORIGIN}/confirm/${id}'>
          Confirm Email
        </a>
      `,
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`,
  }),

  passwordReset: (email, passwordResetLink) => ({
    from: 'recommendItBot@gmail.com',
    to: `${email}`,
    subject: 'Link to Reset Password',
    html: ` 
    <p>
    You're receiving this e-mail because you requested a password reset for your RecommendIt account.

    Please click on the link below to choose a new password.
    </p>
    <a href='${passwordResetLink}'>Reset Password</a>
   `,
  }),
};
