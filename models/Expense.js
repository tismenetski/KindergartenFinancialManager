const mongoose = require('mongoose');
const { db } = require('./User');

const ExpenseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  payFor: { type: String, required: true },
  payTo: { type: String, required: true },
  description: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', //Connect to user id
  },
  monthlyTotal: {
    month: {
      type: String,
      default: '',
    },
    sum: {
      type: Number,
      default: 0,
    },
  },
});

ExpenseSchema.statics.getMonthlyExpenses = async function (id) {
  const obj = await this.aggregate([
    {
      /* group by year and month */
      $group: {
        _id: {
          year: {
            $year: '$date',
          },
          month: {
            $month: '$date',
          },
        },
        total: { $push: '$amount' },
      },
    },
  ]);

  //Extracting values for sum of month and date String
  let temp = 0;
  const { total } = obj[0];
  for (i = 0; i < total.length; i++) {
    temp += total[i];
  }
  const extractDate = `${obj[0]._id.month}/${obj[0]._id.year}`;

  try {
    let res = await this.findByIdAndUpdate(
      id,
      {
        monthlyTotal: { month: extractDate, sum: temp },
      },
      {
        new: true,
        returnNewDocument: true,
      }
    );
    // @todo - Find a way to update all documents who have the same monthlytotal month value
    res = await this.updateMany(
      { monthlyTotal: { month: extractDate } },

      { $set: { monthlyTotal: { month: extractDate, sum: temp } } },

      {
        new: true,
        returnNewDocument: true,
        multi: true,
      }
    );
  } catch (error) {
    console.error(error);

    /*
    const res = await this.findByIdAndUpdate(
      id,
      {
        monthlyTotal: { month: extractDate, sum: temp },
      },
      {
        new: true,
        returnNewDocument: true,
      }
    );

    */
  }
};

ExpenseSchema.post('save', function () {
  this.constructor.getMonthlyExpenses(this._id);
});

module.exports = Expense = mongoose.model('Expense', ExpenseSchema);
