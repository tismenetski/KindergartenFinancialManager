const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
  worker: {
    type: mongoose.Schema.ObjectId,
    ref: 'Worker',
    required: true,
  },
  date: {
    type: Date,
    required: true,
    //unique : true //To keep one salary per month
  },
  hours: {
    type: Number,
    required: true,
  },
  hourRate: {
    type: Number,
    required: true,
  },
  travelExpenses: {
    type: Number,
    required: true,
  },

  total: {
    type: Number,
    default: function () {
      // The default function will multiply hours and hour Rate
      return this.hours * this.hourRate;
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', //Connect to user id
  },
});

SalarySchema.statics.setTotalPayment = async function (id) {
  const obj = await this.aggregate([
    //   {
    //     "$project": {
    //         "total": { "$multiply": ["$hours", "$hourRate"] }
    //     }
    // }
    {
      $match: { _id: id }, //match fields where the bootcamp equals the bootcamp id
    },
    {
      $addFields: {
        total: { $multiply: ['$hours', '$hourRate'] },
      },
    },

    // {
    //   $project: {
    //     user_id: id,
    //     total: { $multiply: ['$hours', '$hourRate'] },
    //   },
    // },
    // {
    //   $group: {
    //     _id: id,
    //     prices: {
    //       $sum: {
    //         $multiply: ['$hours', '$hourRate'],
    //       },
    //     },
    //   },
    // },
  ]);
  console.log(id);
  console.log(obj);

  // try {
  //   await this.save();
  // } catch (error) {
  //   console.error(error);
  // }

  console.log(obj[0]);
  try {
    await this.model('Salary').findByIdAndUpdate(id, {
      //update the model with the result of the average cost in the obj we created above
      total: obj[0].total,
    });
  } catch (error) {
    console.error(error);
  }
};

SalarySchema.post('save', function () {
  this.constructor.setTotalPayment(this._id);
});

module.exports = Salary = mongoose.model('Salary', SalarySchema);
