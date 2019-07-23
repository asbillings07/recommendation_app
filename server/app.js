const express = require('express');
// required to show HTTP requests in console
const morgan = require('morgan');
const expressSession = require('express-session');
const Sequelize = require('sequelize');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const SessionStore = require('express-session-sequelize')(expressSession.Store);
require('dotenv').config();
const GitHubStrategy = require('passport-github').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('./models');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
//create new instance of DB
const myDatabase = new Sequelize(
  'recommendation_app',
  'aaronbillings',
  'password',
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);
// creating to store sessions for passport
const sequelizeSessionStore = new SessionStore({
  db: myDatabase,
});
//route requires
const userRoute = require('./routes/user');
const recommendationRoute = require('./routes/recommendation');
const categoryRoute = require('./routes/category');
const ratingRoute = require('./routes/rating');
const passportAuth = require('./routes/passportAuth');

// callback function
const generateOrFindUser = (accessToken, refreshToken, profile, done) => {
  if (profile.emails[0]) {
    User.findOne({ where: { email: profile.emails[0].value } })
      .then(user => {
        user
          .create({
            firstName: profile.displayName.firstName,
            lastName: profile.displayName.lastName,
            photo: profile.photos[0].value,
          })
          .then((err, user) => {
            return done(err, user);
          });
      })
      .catch(err => console.log(err));
  } else {
    const noEmailError = new Error(
      'Your email privacy settings previent you from signing into bookworm'
    );
    done(noEmailError, null);
  }
};

// Github Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/auth/github/return',
    },
    generateOrFindUser
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:5000/api/auth/facebook/return',
      profileFields: ['id', 'displayName', 'photos', 'email'],
    },
    generateOrFindUser
  )
);

// session options
const sessionOptions = {
  secret: 'this is a secret',
  resave: false,
  saveUninitialized: false,
  store: sequelizeSessionStore,
};
//api routes
app.use('/api', userRoute);
app.use('/api', recommendationRoute);
app.use('/api', categoryRoute);
app.use('/api', ratingRoute);
app.use('/api', passportAuth);

// require session and passport
app.use(expressSession(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

// serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((userid, done) => {
  User.findByPk(userid, (err, user) => {
    done(err, user);
  });
});

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
const server = process.env.PORT || 5000;

// creates server
app.listen(server, () => {
  console.log(`Server is running on ${server}`);
});
