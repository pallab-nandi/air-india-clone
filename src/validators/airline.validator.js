const { db } = require("../models/index.model");

async function validName(req, res, next) {
    let name = req.params.name;
    let airline = await db.airline.findOne({name : {$regex : new RegExp(name, "i")}});

    if(!name) {
        console.log('Name is invalid or not present');
        res.setHeader('content-type', 'application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            status : 'fail',
            message : 'Name is invalid or not present'
        }))
    } else if(!airline) {
        console.log('Airline not Found');
        res.setHeader('content-type', 'application/json');
        res.writeHead(404);
        res.end(JSON.stringify({
            status : 'fail',
            message : 'Airline not Found'
        }))
    } else next();
}

function reqBody(req, res, next) {
    let name = req.body.name;

    if(!name) {
        console.log('Name is not present');
        res.setHeader('content-type', 'application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            status : 'fail',
            message : 'Please provide name before proceed'
        }))
    } else next();
}

module.exports = { 
    validName,
    reqBody
}