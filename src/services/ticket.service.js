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

    getAllTicket(userID) {
        return this.schema
        .findById(userID);
    }

    getTicketByID(id) {
        return this.schema
        .findOne(id);
    }

    //only by administration
    updateTicket(filter, update) {
        return this.schema
        .findOneAndUpdate(filter, update, {returnOriginal : false});
    }

    //only by administration
    deleteTicket(id, toDelete) {
        if(toDelete) {
            return this.schema
            .findByIdAndDelete(id);
        }
    }
}

const ticketService = new TicketService();

module.exports = { ticketService };