const colors = require('colors');
const { reviewService } = require('../services/review.service');

async function addReview(req, res) {

    const review = req.body;
    const ticketID = req.params.ticket_id;

    return await reviewService
    .addReview(ticketID, review)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(201);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'Review added successfully';
        returnValues.data = review;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while adding Review'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while adding Review'
        }))
    })
}

async function getReviews(req, res) {

    let filters = req.query;

    return await reviewService
    .getAllReviews(filters)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(200);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'All Reviews fetched successfully';
        returnValues.data = data;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while fetching Reviews'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while fetching Reviews'
        }))
    })
}

async function getReviewsByID(req, res) {

    const reviewID = req.params.id;
    
    return await reviewService
    .getReviewByID(reviewID)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(200);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'All Reviews fetched successfully';
        returnValues.data = data;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while fetching Reviews'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while fetching Reviews'
        }))
    })
}

async function updateReview(req, res) {
    const reviewID = req.params.id;
    const update = req.body;

    return await reviewService
    .updateReview(reviewID, update)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(202);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'Review updated successfully';
        returnValues.data = data;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while updating Review'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while updating Review'
        }))
    })
}

async function deleteReview(req, res) {
    let toDelete = req.query.delete;
    let reviewID = req.params.id;

    return await reviewService
    .deleteReview(reviewID, toDelete)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(202);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'Review deleted successfully';
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while deleting Review'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while deleting Review'
        }))
    })
}

module.exports = {
    addReview,
    getReviews,
    getReviewsByID,
    updateReview,
    deleteReview
}