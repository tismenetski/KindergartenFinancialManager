const express = require('express');
const { protect } = require('../../middleware/auth');
const advancedResults = require('../../middleware/advancedResults');
const Worker = require('../../models/Worker');

//=====Express=====
const router = express.Router({ mergeParams: true }); // Preserve the req.params values from the parent router. If the parent and the child have conflicting param names, the child’s value take precedence.

const salaryRouter = require('./salaries');

const {
  addWorker,
  getWorker,
  getWorkers,
  updateWorker,
  deleteWorker,
  getSalaries,
  addSalary,
} = require('../../controllers/workers');

router.use('/:workerId/salaries', salaryRouter);

router
  .route('/:id')
  .get(protect, getWorker)
  .put(protect, updateWorker)
  .delete(protect, deleteWorker);
router
  .route('/')
  .get(protect, advancedResults(Worker), getWorkers)
  .post(protect, addWorker);

module.exports = router;
