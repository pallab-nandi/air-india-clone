const { db } = require("../models/index.model");

async function validTicket(req, res, next) {
    let ticket_id = req.params.ticket_id;

    let ticket = await db.ticket.find({_id : ticket_id});

    if(!ticket || ticket.status == 'Cancelled') {
        console.log('Ticket is not valid or Ticket is cancelled');
        res.setHeader('content-type', 'application/json');
        res.writeHead(400);
        let returnValues = {};
        returnValues.status = 'fail';
        if(!ticket) returnValues.message = 'Invalid Ticket';
        else if(ticket.status == 'Cancelled') returnValues.message = 'You cannot add a review on cancelled ticket';
        res.end(JSON.stringify(returnValues));
    } else next();
}

function validBody(req, res, next) {
    let body = req.body;

    if(
        !body.ticket_id ||
        !body.title ||
        !body.ratings
    ) {
        console.log('Body is invalid or not present');
        res.setHeader('content-type', 'application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Body is invalid or not present'
        }))
    } else next();
}

async function validReviewID(req, res, next) {
    let id = req.params.id;
    let review = await db.review.findOne({_id : id});

    if(!id) {
        console.log('ID is invalid or not present');
        res.setHeader('content-type', 'application/json');
        res.writeHead(400);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'ID is invalid or not present'
        }))
    } else if(!review) {
        console.log('Review not found');
        res.setHeader('content-type', 'application/json');
        res.writeHead(404);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Review not found'
        }))
    } else next();
}

async function editOrDeleteValidatator(req, res, next) {
    let userID = req.decodedJwt._id;
    let reviewID = req.params.id;

    let review = await db.review.findOne({_id : reviewID});
    let reviewUser = review.user;

    if(userID !== reviewUser) {
        console.log('Unauthorized Access');
        res.setHeader('content-type', 'application/json');
        res.writeHead(401);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Unauthorized Access'
        }))
    } else next();
}

module.exports = {
    validTicket,
    validBody,
    validReviewID,
    editOrDeleteValidatator
}