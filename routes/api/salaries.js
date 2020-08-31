const express = require('express');
// const router = express.Router();
// const { check, validationResult } = require('express-validator'); //Changed from 'express-validator/check' since it was deprecated
// // const auth = require('../../middleware/auth');
// const Worker = require('../../models/Worker');
// const User = require('../../models/User');
const Salary = require('../../models/Salary');
// const { request } = require('express');
const { protect } = require('../../middleware/auth');
const {
  getSalaries,
  addSalary,
  getSalary,
  updateSalary,
  deleteSalary,
} = require('../../controllers/salaries');
const advancedResults = require('../../middleware/advancedResults');

//=====Express=====
const router = express.Router({ mergeParams: true }); // Preserve the req.params values from the parent router. If the parent and the child have conflicting param names, the child’s value take precedence.

router
  .route('/')
  .get(
    protect,
    advancedResults(Salary, {
      path: 'worker',
      select: 'name',
    }),

    getSalaries
  )
  .post(protect, addSalary);

router
  .route('/:id')
  .get(protect, getSalary)
  .put(protect, updateSalary)
  .delete(protect, deleteSalary);

module.exports = router;
