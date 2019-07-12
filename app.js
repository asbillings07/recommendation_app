const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to the recommendation App!',
  });
});

app.use((err, req, res, next) => {});

const server = process.env.PORT || 5000;

app.listen(server, () => {
  console.log(`Server is running on ${server}`);
});
