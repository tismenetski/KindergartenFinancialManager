//This middleware allow us to follow DRY best practice , create async function that handles try catch  so that we won't need to write it in every function

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
