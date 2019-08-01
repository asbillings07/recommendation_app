const bcrypt = require('bcryptjs');
require('dotenv').config();
const passport = require('passport');
const { findUserByObj } = require('../services/userFunctions');
const passportJWT = require('passport-jwt');
const localStrategy = require('passport-local').Strategy;
const { User } = require('../models');

let ExtractJwt = passportJWT.ExtractJwt;
let JWTstrategy = passportJWT.Strategy;
let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

let strategy = new JWTstrategy(jwtOptions, (jwt_payload, next) => {
  console.log('pay load recived!', jwt_payload);
  let user = findUserByObj({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false, info.message);
  }
});

passport.use(strategy);

// register user if they are new and hash their password
//const saltRounds = 12;
// passport.use(
//   'register',
//   new localStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password',
//       session: false,
//     },
//     (email, password, done) => {
//       try {
//         User.findOne({
//           where: {
//             email,
//           },
//         }).then(user => {
//           if (user) {
//             console.log('email alredy taken, please choose another');
//             return done(null, false, { message: 'email already taken' });
//           } else {
//             bcrypt.hash(password, saltRounds).then(hashPassword => {
//               User.create({
//                 email,
//                 password: hashPassword,
//               }).then(user => {
//                 console.log('user created');
//                 return done(null, user);
//               });
//             });
//           }
//         });
//       } catch (err) {
//         done(err);
//       }
//     }
//   )
// );
// // allow user to log in, compare info in DB with what user entered
// passport.use(
//   'login',
//   new localStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password',
//       session: false,
//     },
//     (email, password, done) => {
//       try {
//         User.findOne({
//           where: {
//             email,
//           },
//         }).then(user => {
//           if (user === null) {
//             return done(null, false, { message: 'bad email' });
//           } else {
//             bcrypt.compareSync(password, user.password).then(res => {
//               if (!res) {
//                 console.log('passwords do not match');
//                 return done(null, false, { message: 'passwords do not match' });
//               }
//               console.log('found user and authed ');
//               return done(null, user);
//             });
//           }
//         });
//       } catch (err) {
//         done(err);
//       }
//     }
//   )
// );
// // JWT options
// const options = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
//   secretOrKey: process.env.JWT_SECRET,
// };
// // use JWT
// passport.use(
//   'jwt',
//   new JWTstrategy(options, (jwt_payload, done) => {
//     try {
//       User.findOne({
//         where: {
//           email: jwt_payload,
//         },
//       }).then(user => {
//         if (user) {
//           console.log('user found in DB');
//           done(null, user);
//         }
//         console.log('user not found in DB');
//         done(null, false);
//       });
//     } catch (err) {
//       done(err);
//     }
//   })
// );
