const express = require('express');
const airlineController = require('../../src/controllers/airline.controller');
const airlineValidator = require('../../src/validators/airline.validator');
const authValidator = require('../../src/validators/auth.validator');

const router = express.Router();


//Fetch all Airlines
router.get('/all', airlineController.getAirlines);

//Fetch airlines by name
router.get('/:name', [airlineValidator.validName], airlineController.getAirlineByName);

//Add Airlines
router.post('/add',[authValidator.verifyJwt, authValidator.isAdmin, airlineValidator.reqBody], airlineController.addAirline);

//Update Airline
router.put('/:name/edit', [authValidator.verifyJwt, authValidator.isAdmin, airlineValidator.validName], airlineController.updateAirline);

//Delete Airline
router.delete('/:name', [authValidator.verifyJwt, authValidator.isAdmin, airlineValidator.validName], airlineController.deleteAirline);


module.exports = router;