const express = require('express');
const { protect } = require('../../middleware/auth');
const Expense = require('../../models/Expense');
const {
  getExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  addExpense,
} = require('../../controllers/expenses');
const advancedResults = require('../../middleware/advancedResults');

//=====Express=====
const router = express.Router({ mergeParams: true }); // Preserve the req.params values from the parent router. If the parent and the child have conflicting param names, the child’s value take precedence.

router
  .route('/')
  .get(protect, advancedResults(Expense), getExpenses)
  .post(protect, addExpense);
router
  .route('/:id')
  .get(protect, getExpense)
  .put(updateExpense)
  .delete(deleteExpense);

module.exports = router;
