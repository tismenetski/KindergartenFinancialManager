const ErrorResponse = require('../utils/errorResponse'); //import errorResponse Class

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //Log to console for the developer
  console.log(err);

  //Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`; //err.value = the value that was passed to this error from the request function
    error = new ErrorResponse(message, 404);
  }

  //Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose Validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ succes: false, error: error.message || 'Server Error' });
};

module.exports = errorHandler;
