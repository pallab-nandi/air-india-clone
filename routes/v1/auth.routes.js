const express = require('express');
const router = express.Router();

const authController = require('../../src/controllers/auth.controller');

// signup
router.post('/signup', authController.signUp);

// login
router.post('/login', authController.logIn);

module.exports = router;