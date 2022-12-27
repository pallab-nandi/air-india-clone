const express = require('express');
const userController = require('../../src/controllers/user.controller');
const userValidator = require('../../src/validators/user.validator');

const router = express.Router();


//Fetch all Users
router.get('/all', userController.getUsers);

//Add Users
router.post('/add', [userValidator.validBody], userController.addUser);

//Update User
router.put('/:username/edit', [userValidator.validUsername], userController.updateUser);

//Delete User
router.delete('/:username', [userValidator.validUsername], userController.deleteUser);


module.exports = router;