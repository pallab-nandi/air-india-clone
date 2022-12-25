const express = require('express');
const airlineController = require('../../src/controllers/airline.controller');

const router = express.Router();


//Fetch all Airlines
router.get('/all', airlineController.getAirlines);

//Fetch airlines by name
router.get('/:name', airlineController.getAirlineByName);

//Add Airlines
router.post('/add', airlineController.addAirline);

//Update Airline
router.put('/:name/edit', airlineController.updateAirline);

//Delete Airline
router.delete('/:name', airlineController.deleteAirline);


module.exports = router;