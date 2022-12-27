const { db } = require('../models/index.model');

class TicketService {
    schema;
    constructor() {
        this.schema = db.ticket;
    }

    bookTicket(ticket) {
        return this.schema
        .create(ticket)
    }

    getAllTicket(userID, filters) {

        if(Object.values(filters).length != 0) {
            return this.#filterFunc(filters);
        }

        return this.schema
        .find({ user : userID});
    }

    getTicketByID(id) {
        return this.schema
        .findOne({id});
    }

    //only by administration
    updateTicket(filter, update) {
        return this.schema
        .findOneAndUpdate({_id : filter}, update, {returnOriginal : false});
    }

    //only by administration
    deleteTicket(id, toDelete) {
        if(toDelete) {
            return this.schema
            .findByIdAndDelete(id);
        }
    }

    //Search and Filter function
    async #filterFunc(filters) {
        if(filters.flight) {
            let flight = await db.flight.findOne({name : { $regex : new RegExp(filters.flight, "i") }});
            let flightID = flight._id;
            return this.schema.find({flight : flightID});
        }

        if(filters.price && filters.price == 'asc') {
            return this.schema.find().sort('costPrice');
        } else if(filters.price && filters.price == 'desc') {
            return this.schema.find().sort('-costPrice');
        }

        if(filters.maxPrice) {
            return this.schema.find({costPrice : {$lte : filters.maxPrice}});
        }

        if(filters.minPrice) {
            return this.schema.find({costPrice : {$gte : filters.minPrice}});
        }

        if(filters.status) {
            return this.schema.find({status : { $regex : new RegExp(filters.status, "i") }});
        }
    }
}

const ticketService = new TicketService();

module.exports = { ticketService };