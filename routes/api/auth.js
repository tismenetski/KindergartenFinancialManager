const express = require('express');
const router = express.Router();
// const auth = require('../../middleware/auth');
// const User = require('../../models/User');
// const { check, validationResult } = require('express-validator'); //Changed from 'express-validator/check' since it was deprecated
// const jwt = require('jsonwebtoken');
// const config = require('config');
// const bcrypt = require('bcryptjs');

// //@route    GET api/auth
// //@desc     Test route
// //@access   Public
// router.get('/', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password'); // show the data without the password
//     res.json(user);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// }); //by adding auth we make the route protected, since auth will run and verify the user

// //@route    POST api/auth
// //@desc     Authenticate user & get token
// //@access   Public
// router.post(
//   '/',
//   [
//     check('email', 'Valid email is required').isEmail(), //Make sure this field is an email
//     check('password', 'Password is required').exists(), // Make sure user typed something in this field
//   ],
//   async (req, res) => {
//     console.log(req.body);
//     const errors = validationResult(req); //we run the function validationResult that populates errors variable with possible errors
//     if (!errors.isEmpty()) {
//       //if errors is not empty return 400 code with the errors array
//       return res.status(400).json({ errors: errors.array() }); // 400 - Bad Request -send back array of errors
//     }

//     const { email, password } = req.body;
//     try {
//       //See if user exists
//       let user = await User.findOne({ email });

//       if (!user) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: 'Invalid Credentials' }] });
//       }

//       const isMatch = await bcrypt.compare(password, user.password); // Compare user password and typed password
//       if (!isMatch) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: 'Invalid Credentials' }] }); // It is safer to place same error message to bad user and bad password since people can't assume which one of them is wrong,  making the app more secure
//       }

//       const payload = {
//         user: {
//           id: user.id,
//         },
//       };

//       jwt.sign(
//         payload,
//         config.get('jwtSecret'),
//         { expiresIn: '5 days' },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send('Server error');
//     }
//   }
// );

const { register, login, logout } = require('../../controllers/auth');
const { protect } = require('../../middleware/auth');

// const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router; //
