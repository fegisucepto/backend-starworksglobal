require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes/index.js');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);
app.use((err, req, res, next) => {
  let code = 500;
  let message = 'Internal Server Error';

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    code = 400;
    message = err.errors[0].message;
  }

  if (err.message === 'User not found') {
    code = 401;
    message = 'Invalid username or password';
  }
  if (err.message === 'less balance') {
    code = 401;
    message = 'Less balance, Please top up first';
  }

  res.status(code).json({
    statusCode: code,
    error: {
      message: message,
    },
  });
});

app.listen(port, () => {
  console.log(`This program is running`, port);
});

module.exports = app;
