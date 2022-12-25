const express = require('express');
const reviewController = require('../../src/controllers/review.controller');

const router = express.Router();


//Fetch all Reviews
router.get('/all', reviewController.getReviews);

//Fetch Reviews by ID
router.get('/:id', reviewController.getReviewsByID);

//Add Reviews
router.post('/:ticket_id/add', reviewController.addReview);

//Update Review
router.put('/:id/edit', reviewController.updateReview);

//Delete Review
router.delete('/:id', reviewController.deleteReview);


module.exports = router;