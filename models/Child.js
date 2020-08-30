const mongoose = require('mongoose');

const ChildSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String },
    birthday: { type: Date, required: true },
    parents: {
      parent1: {
        name: String,
        phoneNumber: String,
      },
      parent2: {
        name: String,
        phoneNumber: String,
      },
    },
    monthlyPayment: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    email: { type: String },
    // payments: [
    //   {
    //     payment: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'payment',
    //       required: true,
    //     },
    //   },
    // ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User', //Connect to user id
      required: true,
    },
  },
  {
    toJSON: { virtuals: true }, //Adding virtuals , which are a reference to an object or field in another schema
    toObject: { virtuals: true },
  }
);

// Reverse populate with virtuals
ChildSchema.virtual('payments', {
  ref: 'Payment', // The referenced object
  localField: '_id', // the field that represents the data we want to see
  foreignField: 'child', //the field that contains localField from the other Object (in Payment we have a field called child that contains child id)
  justOne: false,
});

module.exports = Child = mongoose.model('Child', ChildSchema);
