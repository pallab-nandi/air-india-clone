const { db } = require("../models/index.model");

async function validID(req, res, next) {
    let id = req.params.id;
    let ticket = await db.ticket.findOne({_id : id});

    if(!id) {
        console.log('ID is invalid or not present');
        res.setHeader('content-type', 'application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'ID is invalid or not present'
        }))
    } else if(!ticket) {
        console.log('Ticket Not Found');
        res.setHeader('content-type', 'application/json');
        res.writeHead(404);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Ticket Not Found'
        }))
    } else next();
}

async function validBody(req, res, next) {
    let body = req.body;
    let flight = await db.flight.findOne({name : {$regex : new RegExp(body.flight, "i")}});

    if(
        !body.flight ||
        !body.flightDate ||
        !body.total_seats
    ) {
        console.log('Body is invalid or not present');
        res.setHeader('content-type', 'application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Body is invalid or not present'
        }))
    } else if(!flight) {
        console.log('Flight Not Found');
        res.setHeader('content-type', 'application/json');
        res.writeHead(404);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Flight Not Found'
        }))
    } else next();
}

module.exports = {
    validID,
    validBody
}