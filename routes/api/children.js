const express = require('express');
//const router = express.Router();
// const { check, validationResult } = require('express-validator'); //Changed from 'express-validator/check' since it was deprecated
const { protect } = require('../../middleware/auth');
const Child = require('../../models/Child');
const advancedResults = require('../../middleware/advancedResults');
const {
  getChild,
  getChilds,
  updateChild,
  deleteChild,
  addChild,
} = require('../../controllers/children');
// const User = require('../../models/User');
// const { request } = require('express');

const paymentRouter = require('./payments');

//=====Express=====
const router = express.Router({ mergeParams: true }); // Preserve the req.params values from the parent router. If the parent and the child have conflicting param names, the child’s value take precedence.

router.use('/:childId/payments', paymentRouter); //If the request have /:bootcampId/reviews we will pass it on to the reviewRouter

router
  .route('/')
  .get(protect, advancedResults(Child, 'payments'), getChilds)
  .post(protect, addChild);
router
  .route('/:id')
  .get(protect, getChild)
  .put(protect, updateChild)
  .delete(protect, deleteChild);

// //@route    POST api/children //
// //@desc     Create a child
// //@access   Private
// router.post(
//   '/',
//   [
//     auth,
//     [
//       check('name', 'name is required').not().isEmpty(),
//       check('birthday', 'birthday is required').not().isEmpty(),
//       check('age', 'age is required').not().isEmpty(),
//       check('monthlyPayment', 'monthlyPayment is required')
//         .not()
//         .isEmpty()
//         .isInt({ min: 0 }),
//     ],
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const user = await (await User.findById(req.user.id)).isSelected(
//         '-password'
//       );

//       const newChild = new Child({
//         name: req.body.name,
//         user: req.user.id,
//         birthday: req.body.birthday,
//         age: req.body.age,
//         monthlyPayment: req.body.monthlyPayment,
//       });

//       const child = await newChild.save();

//       res.json(child);
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// //@route    GET api/children
// //@desc     Get all children
// //@access   Private

// router.get('/', auth, async (req, res) => {
//   try {
//     // const children = await Child.find().sort({ name: -1 });
//     const children2 = await Child.find().where('user', req.user.id);
//     // console.log(children2);
//     res.json(children2);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });

// //@route    GET api/children/:id
// //@desc     Get child by id
// //@access   Private

// router.get('/:id', auth, async (req, res) => {
//   try {
//     const child = await Child.findById(req.params.id).where(
//       'user',
//       req.user.id
//     );
//     if (!child) return res.status(404).json({ msg: 'Child not found' });
//     res.json(child);
//   } catch (error) {
//     console.error(error.message);
//     if (error.kind === 'ObjectId')
//       return res.status(404).json({ msg: 'Child not found' });
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
