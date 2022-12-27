const colors = require('colors');
const { airlineService } = require('../services/airline.service');

async function addAirline(req, res) {

    const airline = req.body;

    return await airlineService
    .addAirline(airline)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(201);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'Airline added successfully';
        returnValues.data = airline;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while adding Airlines'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while adding Airline'
        }))
    })
}

async function getAirlines(req, res) {
    return await airlineService
    .getAllAirline()
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(200);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'All airlines fetched successfully';
        returnValues.data = data;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while fetching Airlines'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while fetching Airline'
        }))
    })
}

async function getAirlineByName(req, res) {
    
    const airlineName = req.params.name;

    return await airlineService
    .getAirline(airlineName)
    .then(async (data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(200);
        let flights = await airlineService.getFlightsByAirline(airlineName);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'Airline fetched successfully';
        returnValues.data = JSON.parse(JSON.stringify(data));
        returnValues.data.flights = flights;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while fetching Airlines'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while fetching Airline'
        }))
    })
}

async function updateAirline(req, res) {
    const airlineName = req.params.name;
    const update = req.body;

    return await airlineService
    .updateAirline(airlineName, update)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(202);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'Airline updated successfully';
        returnValues.data = data;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while updating Airlines'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while updating Airline'
        }))
    })
}

async function deleteAirline(req, res) {
    let toDelete = req.query.delete;
    let airlineName = req.params.name;

    return await airlineService
    .deleteAirline(airlineName, toDelete)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(202);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'Airline deleted successfully';
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while deleting Airlines'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while deleting Airline'
        }))
    })
}

module.exports = {
    addAirline,
    getAirlines,
    getAirlineByName,
    updateAirline,
    deleteAirline
}