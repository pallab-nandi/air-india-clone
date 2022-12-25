const { db } = require('../models/index.model');

class ReviewService {
    schema;
    constructor() {
        this.schema = db.review;
    }

    getAllReviews() {
        return this.schema
        .find();
    }

    getReviewByID(id) {
        return this.schema
        .findOne(id);
    }

    async addReview(ticketID, review) {
        let ticket = await db.ticket.findById(ticketID);
        let flight_id = ticket.flight_id;
        review.flight_id = flight_id;
        review.ticket_id = ticketID;

        return this.schema
        .create(review);
    }

    updateReview(filter, update) {
        return this.schema
        .findOneAndUpdate(filter, update, {returnOriginal : false});
    }

    deleteReview(reviewID, toDelete) {
        if(toDelete) {
            return this.schema
            .findByIdAndDelete(reviewID);
        }
    }
}

const reviewService = new ReviewService();

module.exports = { reviewService };