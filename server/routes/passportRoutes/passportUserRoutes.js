const express = require('express');
const router = express.Router();
const passport = require('passport');
const pass = require('../../services/passport');
const { findUserByObj, getUserByObj } = require('../../services/userFunctions');

// Register User
router.post('/register', (req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
    console.log('Something');
    if (err) {
      console.log(err);
      res.json({ error: err, message: err.message });
    }
    if (info) {
      console.log(info.message);
      res.json(info.message);
    } else {
      req.login(user, err => {
        const body = req.body;
        const data = {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
        };
        User.findOne({
          where: {
            email: data.email,
          },
        }).then(user => {
          user
            .update({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
            })
            .then(() => {
              console.log('user created in DB');
              res.status(201).json({ message: 'User created' });
            });
        });
      });
    }
  });
});
// Find User
router.get('/finduser', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      res.json({ message: info.message });
    } else {
      console.log('user found in db from route');
      res.status(200).json({
        auth: true,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        message: 'user found in db',
      });
    }
  })(req, res);
});

// Login User
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    let user = await getUserByObj({ email });
    if (!user) {
      res.status(401).json({ message: `${user} not found` });
    } else if (user.password === password) {
      let payload = { id: user.id };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
    }
  }
});

module.exports = router;
