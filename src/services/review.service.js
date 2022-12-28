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

        let customs = [];

        if(filters.flight) {
            let flight = await db.flight.findOne({name : { $regex : new RegExp(filters.flight, "i") }});
            let flightID = flight._id;
            customs.push({flight : flightID});
        }

        if(filters.maxRating) {
            customs.push({ratings : {$lte : filters.maxRating}});
        }

        if(filters.minRating) {
            customs.push({ratings : {$gte : filters.minRating}});
        }

        if((filters.sort || (filters.sort && filters.sortType)) && customs.length != 0) {
            if(filters.sortType == 'desc') {
                let sortObj = {};
                let sort = filters.sort;
                sortObj[sort] = -1;
                return this.schema.find({$and : customs}).sort(sortObj);
            }
            return this.schema.find({$and : customs}).sort(filters.sort);
        } else if(filters.sort || (filters.sort && filters.sortType)) {
            if(filters.sortType == 'desc') {
                let sortObj = {};
                let sort = filters.sort;
                sortObj[sort] = -1;
                return this.schema.find().sort(sortObj);
            }
            return this.schema.find().sort(filters.sort);
        } else return this.schema.find({$and : customs});
    }
}

const reviewService = new ReviewService();

module.exports = { reviewService };