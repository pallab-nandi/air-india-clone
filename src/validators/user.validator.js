const { db } = require("../models/index.model");

function validBody(req, res, next) {
    let body = req.body;

    if(
        !body.name ||
        !body.username ||
        !body.email ||
        !body.password
    ) {
        console.log('Body is invalid or not present');
        res.setHeader('content-type', 'application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Body is invalid or not present'
        }));
    } else next();
}

function validLoginBody(req, res, next) {
    let body = req.body;

    if(
        !body.email ||
        !body.password
    ) {
        console.log('Body is invalid or not present');
        res.setHeader('content-type', 'application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Body is invalid or not present'
        }));
    } else next();
}

async function validUsername(req, res, next) {
    let username = req.params.username;
    let user = await db.user.findOne({username : {$regex : new RegExp(username, "i")}});

    if(!username) {
        console.log('Username is invalid or not present');
        res.setHeader('content-type', 'application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Username is invalid or not present'
        }))
    } else if(!user) {
        console.log('User Not Found');
        res.setHeader('content-type', 'application/json');
        res.writeHead(404);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'User Not Found'
        }))
    } else next();
}

module.exports = {
    validBody,
    validUsername,
    validLoginBody
}