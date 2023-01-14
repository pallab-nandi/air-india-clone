const { db } = require("../models/index.model");

async function validBody(req, res, next) {
    
    let body = req.body;
    let airline = await db.airline.findOne({name : {$regex : new RegExp(body.airline, "i")}});

    if(
        !body.name ||
        !body.departureAirport ||
        !body.departureTime ||
        !body.arrivalAirport ||
        !body.arrivalTime ||
        !body.duration ||
        !body.price ||
        !body.airline
    ) {
        console.log('Body is invalid or not present');
        res.setHeader('content-type', 'application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            status : 'fail',
            message : 'Body is invalid or not present'
        }))
    } else if(!Number(body.price) && Number(body.price) != 0) {
        console.log('Price is invalid or not present');
        res.setHeader('content-type', 'application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            status : 'fail',
            message : 'Price is invalid or not present'
        }))
    } else if(!airline) {
        console.log('Airline not found');
        res.setHeader('content-type', 'application/json');
        res.writeHead(404);
        res.end(JSON.stringify({
            status : 'fail',
            message : 'Airline Not Found'
        }))
    } else next();
}

async function validName(req, res, next) {
    let name = req.params.name;
    let flight = await db.flight.findOne({name : {$regex : new RegExp(name, "i")}});

    if(!name) {
        console.log('Name is invalid');
        res.setHeader('content-type', 'application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            status : 'fail',
            message : 'Name is invalid or not present'
        }))
    } else if(!flight) {
        console.log('Flight Not Found');
        res.setHeader('content-type', 'application/json');
        res.writeHead(404);
        res.end(JSON.stringify({
            status : 'fail',
            message : 'Flight Not Found'
        }))
    } else next();
}

module.exports = {
    validBody,
    validName
}