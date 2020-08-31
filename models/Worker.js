const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema(
  {
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
    // salaries: [
    //   {
    //     salary: {
    //       type: mongoose.Schema.ObjectId,
    //       ref: 'Salary',
    //     },
    //   },
    // ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User', //Connect to user id
    },
  },
  {
    toJSON: { virtuals: true }, //Adding virtuals , which are a reference to an object or field in another schema
    toObject: { virtuals: true },
  }
);

// Reverse populate with virtuals
WorkerSchema.virtual('salaries', {
  ref: 'Salary', // The referenced object
  localField: '_id', // the field that represents the data we want to see
  foreignField: 'worker', //the field that contains localField from the other Object (in Payment we have a field called child that contains child id)
  justOne: false,
});

module.exports = Worker = mongoose.model('Worker', WorkerSchema);
