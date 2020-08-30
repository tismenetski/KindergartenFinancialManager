const Worker = require('../models/Worker');
const Salary = require('../models/Salary');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc Get single worker
//@route GET /api/workers/:id
//@access Private

exports.getWorker = asyncHandler(async (req, res, next) => {
  const worker = await Worker.findById(req.params.id);

  if (!worker) {
    return next(
      new ErrorResponse(`No worker with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({ success: true, data: worker });
});

//@desc Get all workers
//@route GET /api/workers
//@access Private
exports.getWorkers = asyncHandler(async (req, res, next) => {
  //using asyncHandler we wrap the request with try-catch pre-written function, therefore we don't need to include try-catch in this controller function

  res.status(200).json(res.advancedResults);
});

//@desc Add worker
//@route POST /api/workers
//@access Private
exports.addWorker = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const worker = await Worker.create(req.body);

  res.status(200).json({ success: true, worker });
});

//@desc Update worker
//@route PUT /api/workers/:id
//@access Private
exports.updateWorker = asyncHandler(async (req, res, next) => {
  let worker = await Worker.findById(req.params.id);

  //Workers exists
  if (!worker) {
    return next(
      new ErrorResponse(`No worker with id of ${req.params.id}`, 404)
    );
  }

  //Worker belong to the same user querying
  if (worker.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not allowed to update worker ${req.params.id}`,
        401
      )
    );
  }

  worker = await Worker.findByIdAndUpdate(req.params.id, req.body, {
    //worker found - update with new sent data and validate ,return the new object after update
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, worker });
});

//@desc Delete worker
//@route DELETE /api/workers/:id
//@access Private
exports.deleteWorker = asyncHandler(async (req, res, next) => {
  const worker = await Worker.findById(req.params.id);

  //Workers exists
  if (!worker) {
    return next(
      new ErrorResponse(`No worker with id of ${req.params.id}`, 404)
    );
  }

  //Worker belong to the same user querying
  if (worker.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not allowed to update worker ${req.params.id}`,
        401
      )
    );
  }

  await worker.remove();

  res.status(200).json({ success: true, data: {} });
});

//@desc ADD single salary
//@route POST /api/workers/:workerId/salaries
//@access Private
exports.addSalary = asyncHandler(async (req, res, next) => {
  req.body.worker = req.params.workerId;
  req.body.user = req.user.id;

  const worker = await Worker.findById(req.params.workerId);

  if (!worker) {
    return next(
      new ErrorResponse(`No worker with the id of ${req.params.workerId}`),
      404
    );
  }

  if (worker.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to create a course to bootcamp ${bootcamp._id}`,
        401
      )
    );
  }

  const salary = await Salary.create(req.body);

  res.status(200).json({ success: true, data: salary });
});

//@desc Get salaries
//@route GET /api/salaries
//@route GET /api/workers/:workerId/salaries
//@access Private

exports.getSalaries = asyncHandler(async (req, res, next) => {
  if (req.params.workerId) {
    //if a worker id attached , find the specific id and return the salaries related to the worker
    const salaries = await Salary.find({ worker: req.params.workerId });

    return res
      .status(200)
      .json({ success: true, count: salaries.length, data: salaries });
  } else {
    // no worker id parameter, return all the salaries with pagination ,limit and ect...
    res.status(200).json(res.advancedResults); //this calls the advanced results function that in turn sends back the respnose,and then this function returns the status with the data
  }
});
