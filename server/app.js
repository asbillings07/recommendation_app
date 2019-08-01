const passport = require('passport');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const { findUserByObj, getUserByObj } = require('./services/userFunctions');
const passportJWT = require('passport-jwt');

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

const app = express();
// required to show HTTP requests in console
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

//route requires
const userRoute = require('./routes/user');
const recommendationRoute = require('./routes/recommendation');
const categoryRoute = require('./routes/category');
const ratingRoute = require('./routes/rating');
// const passportRoutes = require('./routes/passportRoutes/passportUserRoutes');

//api routes
app.use('/api', userRoute);
app.use('/api', recommendationRoute);
app.use('/api', categoryRoute);
app.use('/api', ratingRoute);
// app.use('/api', passportRoutes);

app.post('/login', async (req, res, next) => {
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
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'Congrats, it works!' });
});

app.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to the recommendation App!',
  });
});
// global error handler
app.use((err, req, res, next) => {});

// sets port
const server = process.env.PORT || 5000;

// creates server
app.listen(server, () => {
  console.log(`Server is running on ${server}`);
});
