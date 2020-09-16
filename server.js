const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const morgan = require('morgan'); // 3rd party Middleware logger

//Connect Database
connectDB();

//LOAD ENV VARS
dotenv.config({ path: './config/config.env' });

//Init Middleware
app.use(express.json({ extended: false })); //This option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.

//Cookie parser
app.use(cookieParser());

//Define routes
// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/children', require('./routes/api/children'));
// app.use('/api/workers', require('./routes/api/workers'));
// app.use('/api/salaries', require('./routes/api/salaries'));
const auth = require('./routes/api/auth');
const workers = require('./routes/api/workers');
const children = require('./routes/api/children');
const payments = require('./routes/api/payments');
const salaries = require('./routes/api/salaries');
const expenses = require('./routes/api/expenses');
//Mount routers
app.use('/api/auth', auth);
app.use('/api/workers', workers);
app.use('/api/children', children);
app.use('/api/payments', payments);
app.use('/api/salaries', salaries);
app.use('/api/expenses', expenses);
app.use(errorHandler); //Declaring app.use errorhandler is required after announcing use of api since it won't work if we declare it before the api

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
