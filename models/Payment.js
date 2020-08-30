const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  child: { type: mongoose.Schema.ObjectId, ref: 'Child', required: true },
  description: { type: String },
  datePaid: { type: Date, required: true },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', //Connect to user id
    required: true,
  },
});

module.exports = Payment = mongoose.model('Payment', PaymentSchema); //
