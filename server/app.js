const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

/**
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

const app = express();
// required to show HTTP requests in console
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//route requires
const userRoute = require('./routes/user');
const recommendationRoute = require('./routes/recommendation');
const categoryRoute = require('./routes/category');
const ratingRoute = require('./routes/rating');
const passportRoute = require('./routes/passportRoutes/passportRegisterUser');

//api routes
app.use('/api', userRoute);
app.use('/api', recommendationRoute);
app.use('/api', categoryRoute);
app.use('/api', ratingRoute);
app.use('/api', passportRoute);

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
