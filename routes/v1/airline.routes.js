const express = require('express');
const airlineController = require('../../src/controllers/airline.controller');
const airlineValidator = require('../../src/validators/airline.validator');

const router = express.Router();


//Fetch all Airlines
router.get('/all', airlineController.getAirlines);

//Fetch airlines by name
router.get('/:name', [airlineValidator.validName], airlineController.getAirlineByName);

//Add Airlines
router.post('/add',[airlineValidator.reqBody], airlineController.addAirline);

//Update Airline
router.put('/:name/edit', [airlineValidator.validName], airlineController.updateAirline);

//Delete Airline
router.delete('/:name', [airlineValidator.validName], airlineController.deleteAirline);


module.exports = router;