const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  date: { type: Date, default: Date.now },
});

// Encrypt password using bcrypt

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    //if we are not modifying the password we continue to next function
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // this.password reffers to the user object created from the schema and is using the Schema custom method
};

// Sign JWT and return -> this is a Schema method that runs on the specific object that we created , unlike Schema.static which runs on the Schema model itself
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    // create a token with the user id , attach secret and attach expire time
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = User = mongoose.model('User', UserSchema);
