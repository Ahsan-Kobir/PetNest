const { default: mongoose } = require('mongoose');
const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log("ErrorHandler: ", error);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error = new ErrorResponse('Resource not found', 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    error = new ErrorResponse('Duplicate field value entered', 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  if (err instanceof mongoose.Error.CastError) {
    error = new ErrorResponse('Invalid resource ID format', 400);
  }

  res.status(error.statusCode || 500).json({
    error: {
      code: error.statusCode || 500,
      message: error.message || 'Internal Server Error, Please contact team lead'
    }
  });
};

module.exports = errorHandler;