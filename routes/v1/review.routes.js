const express = require('express');
const reviewController = require('../../src/controllers/review.controller');
const reviewValidator = require('../../src/validators/review.validator');

const router = express.Router();


//Fetch all Reviews
router.get('/all', reviewController.getReviews);

//Fetch Reviews by ID
router.get('/:id', [reviewValidator.validReviewID], reviewController.getReviewsByID);

//Add Reviews
router.post('/:ticket_id/add', [reviewValidator.validTicket, reviewValidator.validBody], reviewController.addReview);

//Update Review
router.put('/:id/edit', [reviewValidator.validReviewID], reviewController.updateReview);

//Delete Review
router.delete('/:id', [reviewValidator.validReviewID], reviewController.deleteReview);


module.exports = router;