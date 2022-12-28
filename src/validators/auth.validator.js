const jwt = require('jsonwebtoken');
const { db } = require("../models/index.model");
const authConfig = require('../configs/auth.config');

async function isEmailDuplicate(req, res, next) {
    let email = req.body.email;
    let user = await db.user.findOne({email : {$regex : new RegExp(email, "i")}});

    if(user) {
        console.log('Email is already present');
        res.setHeader('content-type', 'application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            'message' : 'Email is already present.'
        }))
    } else next();
}

function validEmail(req, res, next) {
    let email = req.body.email;
    let valid = false;

    let parts = email.split('@');
    if(!parts[0].includes(' ') && parts.length == 2 && parts[0] && parts[1]  && parts[1].includes('.')) {
        valid = true;
        let subPart = parts[1].split('.');
        for(let part of subPart) {
            if(!part) valid = false;
        }
    }

    if(!valid) {
        console.log('Email is not valid.');
        res.setHeader('content-type', 'application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            'message' : 'Email is not valid. Provide valid email'
        }))
    } else next();
}

function verifyJwt(req, res, next) {
    try {
        let token = req.headers['x-access-token'];
        let decoded = validateJwt(token);
        if(decoded.validate) {
            req.decodedJwt = decoded.decodedJwt;
            next();
        } else {
            console.log(decoded.message);
            res.setHeader('content-type', 'application/json');
            res.writeHead(401);
            res.end(JSON.stringify({
                message : decoded.message
            }))
        }
    } catch (err) {
        console.log(err.message);
        res.setHeader('content-type', 'application/json');
        res.writeHead(401);
        res.end(JSON.stringify({
            message : 'Unauthorized access'
        }))
    }
}

function isAdmin(req, res, next) {
    if(!req.decodedJwt) {
        res.setHeader('content-type', 'application/json');
        res.writeHead(401);
        res.end(JSON.stringify({
            message: 'Decoded Jwt is not present for check'
        }));
    } else {
        let roles = req.decodedJwt.roles;
        let adminRole = roles.filter((role) => role === 'Admin');
        if(adminRole.length == 0) {
            console.log('User is not an Admin');
            res.setHeader('content-type', 'application/json');
            res.writeHead(403);
            res.end(JSON.stringify({
                message : 'Unauthorized access'
            }))
        } else next();
    }
}

//helper function
function validateJwt(token) {
    if(token && token.includes('Bearer')) {
        token = token.substring(7, token.length);
        let decoded = jwt.verify(token, authConfig.SECRET_KEY);
        return {
            validate : true,
            decodedJwt : decoded
        }
    }
    return {
        validate : false,
        message : 'Token is not present'
    }
}

module.exports = {
    isEmailDuplicate,
    validEmail,
    verifyJwt,
    isAdmin
}