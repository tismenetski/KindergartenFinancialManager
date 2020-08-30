const Child = require('../models/Child');
const Payment = require('../models/Payment');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc Add child
//@route POST /api/children
//@access Private
exports.addChild = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const child = await Child.create(req.body);

  res.status(200).json({ success: true, child });
});

//@desc Get all children
//@route GET /api/children
//@access Private
exports.getChilds = asyncHandler(async (req, res, next) => {
  //using asyncHandler we wrap the request with try-catch pre-written function, therefore we don't need to include try-catch in this controller function

  res.status(200).json(res.advancedResults);
});

//@desc Get single child
//@route GET /api/children/:id
//@access Private
exports.getChild = asyncHandler(async (req, res, next) => {
  const child = await Child.findById(req.params.id);

  if (!child) {
    return next(
      new ErrorResponse(`No child with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({ success: true, data: child });
});

//@desc Update child
//@route PUT /api/children/:id
//@access Private
exports.updateChild = asyncHandler(async (req, res, next) => {
  let child = await Child.findById(req.params.id);

  //Child exists
  if (!child) {
    return next(new ErrorResponse(`No child with id of ${req.params.id}`, 404));
  }

  //Child belong to the same user querying
  if (child.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not allowed to update child ${req.params.id}`,
        401
      )
    );
  }

  child = await Child.findByIdAndUpdate(req.params.id, req.body, {
    //child found - update with new sent data and validate ,return the new object after update
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, child });
});

//@desc Delete child
//@route DELETE /api/children/:id
//@access Private
exports.deleteChild = asyncHandler(async (req, res, next) => {
  const child = await Child.findById(req.params.id);

  //Child exists
  if (!child) {
    return next(new ErrorResponse(`No child with id of ${req.params.id}`, 404));
  }

  //Child belong to the same user querying
  if (child.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not allowed to update child ${req.params.id}`,
        401
      )
    );
  }

  await child.remove();

  res.status(200).json({ success: true, data: {} });
});
