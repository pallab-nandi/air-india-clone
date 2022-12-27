const { db } = require('../models/index.model');

class ReviewService {
    schema;
    constructor() {
        this.schema = db.review;
    }

    getAllReviews(filters) {

        if(Object.values(filters).length != 0) {
            return this.#filterFunc(filters);
        }

        return this.schema
        .find();
    }

    getReviewByID(id) {
        return this.schema
        .findOne({id});
    }

    async addReview(ticketID, review) {
        let ticket = await db.ticket.findOne({ticket : ticketID});
        let flight_id = ticket.flight;
        review.flight = flight_id;
        review.ticket_id = ticketID;

        return this.schema
        .create(review);
    }

    updateReview(filter, update) {
        return this.schema
        .findOneAndUpdate({_id : filter}, update, {returnOriginal : false});
    }

    deleteReview(reviewID, toDelete) {
        if(toDelete) {
            return this.schema
            .findByIdAndDelete(reviewID);
        }
    }

    //Search and Filter function
    async #filterFunc(filters) {
        if(filters.flight) {
            let flight = await db.flight.findOne({name : { $regex : new RegExp(filters.flight, "i") }});
            let flightID = flight._id;
            return this.schema.find({flight : flightID});
        }

        if(filters.ratings && filters.ratings == 'asc') {
            return this.schema.find().sort('ratings');
        } else if(filters.ratings && filters.ratings == 'desc') {
            return this.schema.find().sort('-ratings');
        }

        if(filters.maxRating) {
            return this.schema.find({ratings : {$lte : filters.maxRating}});
        }

        if(filters.minRating) {
            return this.schema.find({ratings : {$gte : filters.minRating}});
        }
    }
}

const reviewService = new ReviewService();

module.exports = { reviewService };