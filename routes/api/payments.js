const express = require('express');
// const { check, validationResult } = require('express-validator'); //Changed from 'express-validator/check' since it was deprecated
const { protect } = require('../../middleware/auth');
// const Child = require('../../models/Child');
// const User = require('../../models/User');
const Payment = require('../../models/Payment');

const {
  getPayment,
  getPayments,
  addPayment,
  deletePayment,
  updatePayment,
} = require('../../controllers/payments');
const advancedResults = require('../../middleware/advancedResults');

//=====Express=====
const router = express.Router({ mergeParams: true }); // Preserve the req.params values from the parent router. If the parent and the child have conflicting param names, the child’s value take precedence.

router
  .route('/')
  .get(protect, advancedResults(Payment), getPayments)
  .post(protect, addPayment);
router
  .route('/:id')
  .get(protect, getPayment)
  .put(protect, updatePayment)
  .delete(protect, deletePayment);

// //@route    POST api/payments/:childId
// //@desc     Create a payment made by a child
// //@access   Private
// router.post(
//   '/:childId',
//   [
//     auth,
//     [
//       check('date', 'date is required').not().isEmpty().isDate(),
//       check('amount', 'amount is required').not().isEmpty().isInt({ min: 0 }),
//       check('datePaid', 'datePaid is required').not().isEmpty().isDate(),
//     ],
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const child = await Child.findById(req.params.childId);

//     if (!child) {
//       return res.status(404).json({ success: false, msg: 'child not found' });
//     }
//   }
// );
module.exports = router;
