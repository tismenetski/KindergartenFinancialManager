//This middleware will make sure that each endpoint in our API that require authentication will indeed be authenticated.

const jwt = require('jsonwebtoken');
const config = require('config');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// module.exports = function (req, res, next) {
//   //Get token from the header of incoming request
//   const token = req.header('x-auth-token');

//   //Check if no token available
//   if (!token) {
//     return res.status(401).json({ msg: 'No token , Authorization denied' }); //Not Authorized
//   }

//   //Verify the token
//   try {
//     const decoded = jwt.verify(token, config.get('jwtSecret'));
//     req.user = decoded.user; //assign the request user the user that extracted from the token
//     next();
//   } catch (error) {
//     res.status(401).json({ msg: 'Token is not valid' }); // if we have a token but it's not valid
//   }
// };

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

    console.log(decoded);

    //assign the req.user the user value that we take from the database using decoded user id from the token
    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});
