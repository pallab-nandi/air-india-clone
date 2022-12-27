const express = require('express');
const flightController = require('../../src/controllers/flight.controller');

const router = express.Router();


//Fetch all Flights
router.get('/all', flightController.getFlights);

//Fetch Flights by name
// router.get('/:name', flightController.getFlightByName);

//Add Flights
router.post('/add', flightController.addFlight);

//Update Flight
router.put('/:name/edit', flightController.updateFlight);

//Delete Flight
router.delete('/:name', flightController.deleteFlight);


module.exports = router;