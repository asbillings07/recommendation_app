const { CLIENT_ORIGIN } = require('../Config');

module.exports = {
  confirm: (id, email) => ({
    from: 'recommendItBot@gmail.com',
    to: `${email}`,
    subject: 'Confirm Your Email',
    html: `
        <h1> Welcome to RecommendIt! </h1>
        <p>Click the link below to confirm your email </p>
        <a href='${CLIENT_ORIGIN}/confirm/${id}'>
          Confirm Email
        </a>
        <p>We hope you enjoy using the App, if you think of anything that could make your experience better, please let us know!</p>
      `,
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

    <p>If you did not request to reset your password, please disregard this email and your password will not be changed.
    </p>
   `,
  }),
};
