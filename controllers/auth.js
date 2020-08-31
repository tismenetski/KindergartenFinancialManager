const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const crypto = require('crypto');

//@desc Register user
//@route POST /api/auth/register
//@access Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  //Create user

  const user = await User.create({
    name,
    email,
    password,
  });

  sendTokenResponse(user, 200, res);
});

//@desc Login user
//@route POST /api/auth/login
//@access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  console.log(email);
  //console.log(password);

  //Validate email and password

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  //Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches using a custom method we created inside the User Schema
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

//@desc Log user out / clear cookie
//@route GET /api/auth/logout
//@access Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ success: true, data: {} });
});

//@desc Get current logged in user
//@route GET /api/auth/me
//@access Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  //const user = req.user;

  res.status(200).json(user);
});

// Get token from model, create cookie and send response -> this function replaces repetitive code in both register and login functions
const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken(); // getSignedJwtToken - > a custom method inside the User Schema

  //create options object to send to the cookie , expiration date
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ), // 30 days
    httpOnly: true,
  };

  //By default we disabled https secure. this statement allows https in production
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token });
};
