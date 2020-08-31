//This middleware will make sure that each endpoint in our API that require authentication will indeed be authenticated.

const jwt = require('jsonwebtoken');
const config = require('config');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]; // the token is 'Bearer xxxxxxxx' so we split the string to two array values and grab the second array value
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  //Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //assign the req.user the user value that we take from the database using decoded user id from the token
    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});
