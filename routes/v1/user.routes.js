const express = require('express');
const userController = require('../../src/controllers/user.controller');
const userValidator = require('../../src/validators/user.validator');
const authValidator = require('../../src/validators/auth.validator');

const router = express.Router();


//Fetch all Users
router.get('/all', [authValidator.verifyJwt, authValidator.isAdmin], userController.getUsers);

//Add Users
router.post('/add', [authValidator.verifyJwt, authValidator.isAdmin, userValidator.validBody], userController.addUser);

//Update User
router.put('/:username/edit', [authValidator.verifyJwt, authValidator.isAdmin, userValidator.validUsername], userController.updateUser);

//Delete User
router.delete('/:username', [authValidator.verifyJwt, authValidator.isAdmin, userValidator.validUsername], userController.deleteUser);


module.exports = router;