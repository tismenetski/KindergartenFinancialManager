const Expense = require('../models/Expense');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc Get expenses
//@route GET /api/expenses
//@access Private

exports.getExpenses = asyncHandler(async (req, res, next) => {
  //using asyncHandler we wrap the request with try-catch pre-written function, therefore we don't need to include try-catch in this controller function

  res.status(200).json(res.advancedResults);
});

//@desc Get expenses
//@route GET /api/expenses/:id
//@access Private

exports.getExpense = asyncHandler(async (req, res, next) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    return next(
      new ErrorResponse(`There is no expense with id ${req.params.id}`, 404)
    );
  }

  if (req.user.id !== expense.user.toString()) {
    return next(
      new ErrorResponse(
        `Not authorized to view the details of id ${req.params.id}`,
        401
      )
    );
  }

  res.status(200).json({ success: true, data: expense });
});

//@desc Add expense
//@route POST /api/expenses
//@access Private

exports.addExpense = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const expense = await Expense.create(req.body);

  res.status(201).json({ success: true, data: expense });
});

//@desc Update expense
//@route PUT /api/expenses/:id
//@access Private

exports.updateExpense = asyncHandler(async (req, res, next) => {
  let expense = await Expense.findById(req.params.id); //Find the payment

  if (!expense) {
    //If not found return error
    return next(
      new ErrorResponse(`No expense with the id of ${req.params.id}`),
      404
    );
  }
  //Make sure user is expense owner
  if (expense.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this expense ${payment._id}`,
        401
      )
    );
  }

  expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    //expense found - update with new sent data and validate ,return the new object after update
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: expense });
});

//@desc Delete expense
//@route DELETE /api/expenses/:id
//@access Private

exports.deleteExpense = asyncHandler(async (req, res, next) => {
  const expense = await Expense.findById(req.params.id); //Find the expense

  if (!expense) {
    //If not found return error
    return next(
      new ErrorResponse(`No expense with the id of ${req.params.id}`),
      404
    );
  }

  //Make sure user is expense owner
  if (expense.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this expense ${expense._id}`,
        401
      )
    );
  }

  await expense.remove();

  res.status(200).json({ success: true, data: {} });
});
