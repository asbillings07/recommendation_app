const express = require('express');
const router = express.Router();
const passport = require('passport');
const { User } = require('../../models');

router.post('/register', (req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
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
          username: user.username,
        };
        User.findOne({
          where: {
            username: data.username,
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
  })(next);
});

module.exports = router;
