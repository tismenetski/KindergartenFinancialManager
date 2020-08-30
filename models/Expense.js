const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  for: { type: String, required: true },
  to: { type: String, required: true },
  description: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', //Connect to user id
  },
});

module.exports = Expense = mongoose.model('Expense', ExpenseSchema);
