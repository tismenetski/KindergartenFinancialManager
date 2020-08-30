const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); //Changed from 'express-validator/check' since it was deprecated
// const auth = require('../../middleware/auth');
const Worker = require('../../models/Worker');
const User = require('../../models/User');
const Salary = require('../../models/Salary');
const { request } = require('express');
const { protect } = require('../../middleware/auth');

//@route    POST api/salaries/:id
//@desc     Create a salary with worker id
//@access   Private

router.post(
  '/:id',
  [
    protect,
    [
      check('date', 'date is required').not().isEmpty().isDate(),
      check('hourRate', 'hourRate is required')
        .not()
        .isEmpty()
        .isInt({ min: 30 }),
      check('hours', 'working hours is required')
        .not()
        .isEmpty()
        .isInt({ min: 0 }),
      check('total', 'total is required').not().isEmpty().isInt({ min: 0 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const worker = await Worker.findById(req.params.id);

      const newSalary = new Salary({
        date: req.body.date,
        hourRate: req.body.hourRate,
        worker: worker,
        user: req.user.id,
        total: req.body.total,
        hours: req.body.hours,
      });

      const salary = await newSalary.save();
      const { salaries } = worker;
      salaries.push(salary);
      await worker.save();
      res.json(salary);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET api/salaries
//@desc     GET  all salaries
//@access   Private
router.get('/', protect, async (req, res) => {
  try {
    const salaries = await Salary.find()
      .where('user', req.user.id)
      .sort({ date: -1 });
    res.json(salaries);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/salaries/:id
//@desc     GET  salary by id
//@access   Private
router.get('/:id', protect, async (req, res) => {});

module.exports = router;
