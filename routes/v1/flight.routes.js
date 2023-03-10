const express = require('express');
const flightController = require('../../src/controllers/flight.controller');
const flightValidator = require('../../src/validators/flight.validator');
const authValidator = require('../../src/validators/auth.validator');

const router = express.Router();


//Fetch all Flights
router.get('/all', flightController.getFlights);

//Fetch Flights by name
router.get('/:name', [flightValidator.validName], flightController.getFlightByName);

//Add Flights
router.post('/add', [authValidator.verifyJwt, authValidator.isAdmin, flightValidator.validBody], flightController.addFlight);

//Update Flight
router.put('/:name/edit', [authValidator.verifyJwt, authValidator.isAdmin, flightValidator.validName], flightController.updateFlight);

//Delete Flight
router.delete('/:name', [authValidator.verifyJwt, authValidator.isAdmin, flightValidator.validName], flightController.deleteFlight);


module.exports = router;