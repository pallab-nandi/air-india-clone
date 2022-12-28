const express = require('express');
const router = express.Router();

const authController = require('../../src/controllers/auth.controller');
const userValidator = require('../../src/validators/user.validator');
const authValidator = require('../../src/validators/auth.validator');

// signup
router.post('/signup', [userValidator.validBody, authValidator.validEmail], authController.signUp);

// login
router.post('/login', [userValidator.validLoginBody, authValidator.validEmail], authController.logIn);

module.exports = router;