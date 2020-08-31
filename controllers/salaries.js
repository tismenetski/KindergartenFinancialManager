const Salary = require('../models/Salary');
const Worker = require('../models/Worker');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc ADD single salary
//@route POST /api/worker/:workerId/salaries
//@access Private
exports.addSalary = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.worker = req.params.workerId;
  const worker = await Worker.findById(req.params.workerId);
  if (!worker) {
    return next(
      new ErrorResponse(`No worker with id ${req.params.workerId}`, 404)
    );
  }

  if (worker.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not allowed to update worker ${req.params.workerId}`,
        401
      )
    );
  }

  const salary = await Salary.create(req.body);

  res.status(200).json({ success: true, data: salary });
});

//@desc Get single salary
//@route GET /api/salaries/:id
//@access Private
exports.getSalary = asyncHandler(async (req, res, next) => {
  const salary = await Salary.findById(req.params.id);
  if (!salary) {
    return next(new ErrorResponse(`No salary with id ${req.params.id}`, 404));
  }

  if (salary.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not allowed to update salary ${req.params.id}`,
        401
      )
    );
  }

  res.status(200).json({ success: true, data: salary });
});

//@desc Get salaries
//@route GET /api/salaries
//@route GET /api/workers/:workerId/salaries
//@access Private
exports.getSalaries = asyncHandler(async (req, res, next) => {
  if (req.params.workerId) {
    //if a worker id attached , find the specific id and return the salaries related to the worker
    const salary = await Salary.find({ worker: req.params.workerId });

    return res
      .status(200)
      .json({ success: true, count: salary.length, data: salary });
  } else {
    // no worker id parameter, return all the salaries with pagination ,limit and ect...
    res.status(200).json(res.advancedResults); //this calls the advanced results function that in turn sends back the respnose,and then this function returns the status with the data
  }
});

//@desc Update single salary
//@route PUT /api/salaries/:id
//@access Private
exports.updateSalary = asyncHandler(async (req, res, next) => {
  let salary = await Salary.findById(req.params.id);
  if (!salary) {
    return next(new ErrorResponse(`No worker with id ${req.params.id}`, 404));
  }

  if (salary.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not allowed to update salary ${salary._id}`,
        401
      )
    );
  }

  salary = await Salary.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: salary });
});

//@desc Delete single salary
//@route PUT /api/salaries/:salaryId
//@access Private
exports.deleteSalary = asyncHandler(async (req, res, next) => {
  let salary = await Salary.findById(req.params.id);
  if (!salary) {
    return next(new ErrorResponse(`No worker with id ${req.params.id}`, 404));
  }

  if (salary.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not allowed to update salary ${salary._id}`,
        401
      )
    );
  }

  await salary.remove();
  res.status(200).json({ success: true, data: {} });
});
