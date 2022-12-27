const express = require('express');
const router = express.Router();

const authController = require('../../src/controllers/auth.controller');
const userValidator = require('../../src/validators/user.validator');

// signup
router.post('/signup', [userValidator.validBody], authController.signUp);

// login
router.post('/login', [userValidator.validLoginBody], authController.logIn);

module.exports = router;