const express = require('express');
const { PORT, CLIENT_ORIGIN } = require('./Config');
require('dotenv').config();
// required to show HTTP requests in console
const morgan = require('morgan');
const Sequelize = require('sequelize');
const cors = require('cors');
const expressSession = require('express-session');
const SessionStore = require('connect-session-sequelize')(expressSession.Store);
const cookieParser = require('cookie-parser');

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
const myDB = new Sequelize('recommendation_app', 'aaronbillings', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

const store = new SessionStore({
  db: myDB,
  checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
  expiration: 24 * 60 * 60 * 1000,
});

//new table session

const sessionOptions = {
  secret: 'shhhhhhhh!',
  store,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 360000,
  },
};
store.sync();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(expressSession(sessionOptions));

//route requires
const userRoute = require('./routes/user');
const recommendationRoute = require('./routes/recommendation');
const categoryRoute = require('./routes/category');
const ratingRoute = require('./routes/rating');
const passwordReset = require('./routes/passwordReset');

//api routes
app.use('/api', userRoute);
app.use('/api', recommendationRoute);
app.use('/api', categoryRoute);
app.use('/api', ratingRoute);
app.use('/api', passwordReset);

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
