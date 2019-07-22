const express = require('express');
const router = express.Router();
const passport = require('passport');

// GitHub Routes
// GET /auth/login/github
router.get(
  '/auth/login/github',
  passport.authenticate('github'),
  (req, res) => {
    res.status(200).json({ message: 'Suceesfully paired with Github' });
  }
);

// GET /auth/github/return
router.get(
  '/auth/github/return',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // success Auth, redirect profile page
    res.location('/');
  }
);

// GET /auth/logout
router.get('/github/logout', (req, res) => {
  req.logout();
  res.location('/').end();
});

// Facebook Routes

// GET /auth/login/facebook
router.get(
  '/auth/login/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

// GET /auth/facebook/return
router.get(
  '/auth/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    // success Auth, redirect profile page
    res.location('/');
  }
);

// GET /auth/logout
router.get('/auth/logout', (req, res) => {
  req.logout();
  res.location('/').end();
});

module.exports = router;
