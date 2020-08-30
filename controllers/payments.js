const Payment = require('../models/Payment');
const Child = require('../models/Child');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc Get payments
//@route GET /api/payments
//@route GET /api/children/:childId/payments
//@access Private

exports.getPayments = asyncHandler(async (req, res, next) => {
  if (req.params.childId) {
    const child = await Child.findById(req.params.id);

    if (!child) {
      return next(
        new ErrorResponse(`There is not child with id ${req.params.id}`, 404)
      );
    }

    if (req.user.id !== child.user.toString()) {
      return next(
        new ErrorResponse(
          `Not authorized to view the details of id ${req.params.id}`,
          401
        )
      );
    }
    const payments = await Payment.find({ child: req.params.childId });

    return res
      .status(200)
      .json({ success: true, count: payments.length, data: payments });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

//@desc Get  single payment
//@route GET /api/payments/:id
//@access Private

exports.getPayment = asyncHandler(async (req, res, next) => {
  if (req.params.childId) {
    const child = await Child.findById(req.params.id);

    if (!child) {
      //Child Exists
      return next(
        new ErrorResponse(`There is not child with id ${req.params.id}`, 404)
      );
    }

    if (req.user.id !== child.user.toString()) {
      //The user requesting the info is connected to the child
      return next(
        new ErrorResponse(
          `Not authorized to view the details of id ${req.params.id}`,
          401
        )
      );
    }
    const payments = await Payment.find({ child: req.params.childId }); //Extract all payments by the childId
    return res
      .status(200)
      .json({ success: true, count: payments.length, data: payments }); // Send back data
  } else {
    res.status(200).json(res.advancedResults); //No childId as parameter , return all results
  }
});

//@desc ADD single payment
//@route POST /api/children/:childId/payments
//@access Private

exports.addPayment = asyncHandler(async (req, res, next) => {
  req.body.child = req.params.childId; //We assign the req.body the value of the bootcampId ,so that our new posted object will already contain a bootcamp value
  req.body.user = req.user.id;

  const child = await Child.findById(req.params.childId);

  if (!child) {
    return next(
      new ErrorResponse(`No child with the id of ${req.params.childId}`),
      404
    );
  }

  //Make sure user is child owner
  if (child.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to create a payment to child ${child._id}`,
        401
      )
    );
  }
  const payment = await Payment.create(req.body); // include everything sent from the body , including the child id

  res.status(200).json({ success: true, data: payment });
});

//@desc Update payment
//@route PUT /api/payments/:id
//@access Private

exports.updatePayment = asyncHandler(async (req, res, next) => {
  let payment = await Payment.findById(req.params.id); //Find the payment

  if (!payment) {
    //If not found return error
    return next(
      new ErrorResponse(`No payment with the id of ${req.params.id}`),
      404
    );
  }
  //Make sure user is payment owner
  if (payment.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this payment ${payment._id}`,
        401
      )
    );
  }

  payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
    //payment found - update with new sent data and validate ,return the new object after update
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: payment });
});

//@desc Delete payment
//@route DELETE /api/payments/:id
//@access Private

exports.deletePayment = asyncHandler(async (req, res, next) => {
  const payment = await Payment.findById(req.params.id); //Find the payment

  if (!payment) {
    //If not found return error
    return next(
      new ErrorResponse(`No payment with the id of ${req.params.id}`),
      404
    );
  }

  //Make sure user is course owner
  if (payment.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this payment ${payment._id}`,
        401
      )
    );
  }

  await payment.remove();

  res.status(200).json({ success: true, data: {} });
});
