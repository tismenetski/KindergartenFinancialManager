const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); //Changed from 'express-validator/check' since it was deprecated
