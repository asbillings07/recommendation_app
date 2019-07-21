const bcrypt = require('bcryptjs');
require('dotenv').config();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passort-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../models');

const saltRounds = 12;

// register user if they are new and hash their password
passport.use(
  'register',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      try {
        User.findOne({
          where: {
            username,
          },
        }).then(user => {
          if (user) {
            console.log('username alredy taken, please choose another');
            return done(null, false, { message: 'username already taken' });
          } else {
            bcrypt.hash(password, saltRounds).then(hashPassword => {
              User.create({
                username,
                password: hashPassword,
              }).then(user => {
                console.log('user created');
                return done(null, user);
              });
            });
          }
        });
      } catch (err) {
        done(err);
      }
    }
  )
);
// allow user to log in, compare info in DB with what user entered
passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      try {
        User.findOne({
          where: {
            username,
          },
        }).then(user => {
          if (user === null) {
            return done(null, false, { message: 'bad username' });
          } else {
            bcrypt.compareSync(password, user.password).then(res => {
              if (!res) {
                console.log('passwords do not match');
                return done(null, false, { message: 'passwords do not match' });
              }
              console.log('found user and authed ');
              return done(null, user);
            });
          }
        });
      } catch (err) {
        done(err);
      }
    }
  )
);
// JWT options
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.JWT_SECRET,
};
// use JWT
passport.use(
  'jwt',
  new JWTstrategy(options, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          username: jwt_payload,
        },
      }).then(user => {
        if (user) {
          console.log('user found in DB');
          done(null, user);
        }
        console.log('user not found in DB');
        done(null, false);
      });
    } catch (err) {
      done(err);
    }
  })
);
