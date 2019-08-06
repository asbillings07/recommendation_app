const express = require('express');
const { PORT, CLIENT_ORIGIN } = require('./Config');
// required to show HTTP requests in console
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
require('bcryptjs');
require('jsonwebtoken');
require('dotenv').config();
const passportJWT = require('passport-jwt');
const { findUserByObj } = require('./services/userFunctions');

// Passport JWT Authentication
let ExtractJwt = passportJWT.ExtractJwt;
let JWTstrategy = passportJWT.Strategy;
let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
exports.jwtOptions = jwtOptions;
// create Strategy for passport
let strategy = new JWTstrategy(jwtOptions, async (jwt_payload, next) => {
  console.log('pay load recived!', jwt_payload);
  let user = await findUserByObj({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false, info.message);
  }
});

passport.use(strategy);
// export passport authenication middleware
const authenticateUser = passport.authenticate('jwt', { session: false });
exports.authenticateUser = authenticateUser;

/// whitelisting for Cors
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const app = express();
exports.app = app;
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());

//route requires
const userRoute = require('./routes/user');
const recommendationRoute = require('./routes/recommendation');
const categoryRoute = require('./routes/category');
const ratingRoute = require('./routes/rating');
const passwordReset = require('./routes/passwordReset');
const commentRoute = require('./routes/comment');

//api routes
app.use('/api', userRoute);
app.use('/api', recommendationRoute);
app.use('/api', categoryRoute);
app.use('/api', ratingRoute);
app.use('/api', passwordReset);
app.use('/api', commentRoute);

app.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to the recommendation App!',
  });
});
// global error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  if (err.status >= 100 && err.status < 600) {
    res.status(err.status).json({ err });
    console.log(err.status);
    console.log(err.message);
    console.log(err.stack);
  } else {
    res.status(500).json({ message: 'an internal server error occured' });
    console.log(500);
    console.log(err.message);
    console.log(err.stack);
  }
});

// sets port

// creates server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
