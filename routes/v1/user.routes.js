const express = require('express');
const userController = require('../../src/controllers/user.controller');

const router = express.Router();


//Fetch all Users
router.get('/all', userController.getUsers);

//Add Users
router.post('/add', userController.addUser);

//Update User
router.put('/:name/edit', userController.updateUser);

//Delete User
router.delete('/:name', userController.deleteUser);


module.exports = router;