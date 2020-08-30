const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter worker name'],
    minlength: 3,
  },
  age: { type: Number, required: [true, 'Please enter the worker age'] },
  hourPaymentRate: {
    type: Number,
    required: [true, 'Please enter hour payment rate'],
  },
  birthday: {
    type: Date,
  },
  startWorkingDate: {
    type: Date,
    required: [true, 'Please enter start working date'],
  },
  endDate: {
    type: Date,
    default: Date.now() + 60 * 60 * 24 * 365 * 50 * 1000,
  },
  salaries: [
    {
      salary: {
        type: mongoose.Schema.ObjectId,
        ref: 'Salary',
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', //Connect to user id
  },
});

module.exports = Worker = mongoose.model('Worker', WorkerSchema);
