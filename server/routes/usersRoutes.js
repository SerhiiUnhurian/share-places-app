const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/usersController');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post('/login', usersController.login);
router.post(
  '/signup',
  [
    check('username').isLength({ min: 3 }),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  usersController.signup
);

module.exports = router;
