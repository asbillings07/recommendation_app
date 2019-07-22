const passport = require('passport');
require('dotenv').config();
const session = require('express-session');
const GitHubStrategy = require('passport-github').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../models');

/**
 * Auth with Facebook and GitHub
 * To Use Passport 
 * Require Passport 
 * Require Session
 * app.use(passport.initialize())

// Restore Session
app.use(passport.session())
 * 1. Install Strategy
 * 2. Create application with OAUTH provider
 * 3. Configure Strategy
 * 4. Create routes for logging in with provider
 */

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((userid, done) => {
  User.findByPk(userid, (err, user) => {
    done(err, user);
  });
});
