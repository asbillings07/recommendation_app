const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
require('dotenv').config();
const passportJWT = require('passport-jwt');
const { findUserByObj, getUserByObj } = require('./services/userFunctions');
// create JWT
let ExtractJwt = passportJWT.ExtractJwt;
let JWTstrategy = passportJWT.Strategy;
let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
// create Strategy for passport
let strategy = new JWTstrategy(jwtOptions, async (jwt_payload, next) => {
  console.log('pay load recived!', jwt_payload);
  let user = await findUserByObj({ id: jwt_payload.id });
  console.log(user.id);
  if (user) {
    next(null, user);
  } else {
    next(null, false, info.message);
  }
});

passport.use(strategy);

// Authentication Route

route.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    let user = await getUserByObj({ email });
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

const authenticate = passport.authenticate('jwt', { session: false });

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Congrats, it works!' });

module.exports = router
