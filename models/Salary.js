const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  hourRate: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', //Connect to user id
  },
});

module.exports = Salary = mongoose.model('Salary', SalarySchema);
