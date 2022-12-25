const colors = require('colors');
const { flightService } = require('../services/flight.service');

async function addFlight(req, res) {

    const flight = req.body;

    return await flightService
    .addFlight(flight)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(201);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'Flight added successfully';
        returnValues.data = flight;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while adding Flight'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while adding Flight'
        }))
    })
}

async function getFlights(req, res) {
    return await flightService
    .getAllFlights()
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(200);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'All Flights fetched successfully';
        returnValues.data = data;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while fetching Flights'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while fetching Flight'
        }))
    })
}

async function getFlightByName(req, res) {
    
    const flightName = req.params.name;

    return await flightService
    .getFlightByName(flightName)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(200);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'Flight fetched successfully';
        returnValues.data = data;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while fetching Flight'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while fetching Flight'
        }))
    })
}

async function updateFlight(req, res) {
    const flightName = req.params.name;
    const update = req.body;

    return await flightService
    .updateFlight({flightName}, update)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(202);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'Flight updated successfully';
        returnValues.data = data;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while updating Flight'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while updating Flight'
        }))
    })
}

async function deleteFlight(req, res) {
    let toDelete = req.query.delete;
    let flightName = req.params.name;

    return await flightService
    .deleteFlight(flightName, toDelete)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(202);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'Flight deleted successfully';
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while deleting Flight'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while deleting Flight'
        }))
    })
}

module.exports = {
    addFlight,
    getFlights,
    getFlightByName,
    updateFlight,
    deleteFlight
}