const { db } = require('../models/index.model');

class TicketService {
    schema;
    constructor() {
        this.schema = db.ticket;
    }

    async bookTicket(ticket) {
        let flight = await db.flight.findOne({name : {$regex : new RegExp(ticket.flight, "i")}});
        ticket.flight = flight._id;
        ticket.flightDate = flight.departureTime;
        
        let cost = flight.price;
        ticket.costPrice = parseInt(ticket.total_seats) * parseInt(cost);

        return this.schema
        .create(ticket)
    }

    getAllTicket(userID, filters) {

        if(Object.values(filters).length != 0) {
            return this.#filterFunc(userID, filters);
        }

        return this.schema
        .find({ user : userID});
    }

    getTicketByID(userID, id) {
        return this.schema
        .findOne({user : userID, _id : id});
    }

    //only by administration
    updateTicket(filter, update, cancel) {

        if(cancel) {
            return this.schema
            .findOneAndUpdate({_id : filter}, {status : 'Cancelled'}, {returnOriginal : false});
        }

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
    async #filterFunc(userID, filters) {

        let customs = [];

        if(filters.flight) {
            let flight = await db.flight.findOne({user : userID, name : { $regex : new RegExp(filters.flight, "i") }});
            let flightID = flight._id;
            customs.push({user : userID, flight : flightID});
        }

        if(filters.maxPrice) {
            customs.push({user : userID, costPrice : {$lte : filters.maxPrice}});
        }

        if(filters.minPrice) {
            customs.push({user : userID, costPrice : {$gte : filters.minPrice}});
        }

        if(filters.status) {
            customs.push({user : userID, status : { $regex : new RegExp(filters.status, "i") }});
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
                return this.schema.find({user : userID}).sort(sortObj);
            }
            return this.schema.find({user : userID}).sort(filters.sort);
        } else return this.schema.find({$and : customs});
    }
}

const ticketService = new TicketService();

module.exports = { ticketService };