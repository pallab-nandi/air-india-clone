const express = require('express');
const userController = require('../../src/controllers/user.controller');

const router = express.Router();


//Fetch all Users
router.get('/all', userController.getUsers);

//Add Users
router.post('/add', userController.addUser);

//Update User
router.put('/:username/edit', userController.updateUser);

//Delete User
router.delete('/:username', userController.deleteUser);


module.exports = router;