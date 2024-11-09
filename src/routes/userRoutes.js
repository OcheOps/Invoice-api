const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');
const { body } = require('express-validator');

router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty()
], register);

router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], login);

module.exports = router;