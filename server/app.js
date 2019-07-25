const express = require('express');
// required to show HTTP requests in console
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//route requires
const userRoute = require('./routes/user');
const recommendationRoute = require('./routes/recommendation');
const categoryRoute = require('./routes/category');
const ratingRoute = require('./routes/rating');

//api routes
app.use('/api', userRoute);
app.use('/api', recommendationRoute);
app.use('/api', categoryRoute);
app.use('/api', ratingRoute);

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
