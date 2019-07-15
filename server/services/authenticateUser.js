const { User } = require('../models');
const bcrypt = require('bcryptjs');
const auth = require('basic-auth');

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      console.log(err);
    }
  };
}

const authenticateUser = asyncHandler(async (req, res, next) => {
  // parse user's creds from the auth header
  const credentials = auth(req);

  if (credentials) {
    const user = await User.findOne({
      where: { email: credentials.name },
    });

    if (user) {
      const authed = bcrypt.compareSync(credentials.pass, user.password);

      if (authed) {
        req.currentUser = user;
        next();
      } else {
        message = `Authentication failure for username: ${user.email}`;
        res.status(401).json({ message: 'Access Denied', error: message });
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
      res.status(401).json({ message: 'Access Denied', error: message });
    }
  } else {
    message = 'Auth header not found';
    res.status(401).json({ message: 'Access Denied', error: message });
  }
});

exports.authenticateUser = authenticateUser;
