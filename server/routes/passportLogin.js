const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { findUserByObj } = require('../services/userFunctions');
const { app, jwtOptions } = require('../app');
// Authentication Route
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    let user = await findUserByObj({ email });
    if (!user) {
      res.status(401).json({ message: `${user} not found` });
    }
    if (bcrypt.compareSync(password, user.password)) {
      let payload = { id: user.id };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ message: 'ok', token: token });
    } else {
      res.status(401).json({ message: `Password is incorrect` });
    }
  } else {
    res.json({ message: 'please enter email and password' });
  }
});

module.exports = router;
