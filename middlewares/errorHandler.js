'use strict';

function errorHandler(err, req, res, next) {
  console.log(err);
  const { name, errors } = err;
  let code = 500;
  let msg = 'Internal Server Error';

  if (err.message === 'User not found') {
    code = 401;
    msg = 'Invalid Email or Password';
  } else if (err.message === 'data not found') {
    code = 400;
    msg = err.message;
  } else if (err.name === 'JsonWebTokenError') {
    code = 401;
    msg = 'Access Token is Invalid';
  } else if (err.message === 'Forbidden') {
    code = 403;
    msg = 'Forbidden Access';
  } else if (name === 'SequelizeValidationError' || name === 'SequelizeUniqueConstraintError') {
    code = 400;
    message = errors.map(({ message }) => message);
  } else if (err.name === 'error not foundt') {
    code = 404;
    msg = 'Params must be an integer number';
  } else if (err.name === 'Data Error') {
    code = 404;
    msg = 'Data is not found';
  }

  res.status(code).json({
    statusCode: code,
    message: msg,
  });
}

module.exports = errorHandler;
