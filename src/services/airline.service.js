const { db } = require('../models/index.model');

class AirlineService {
    schema;
    constructor() {
        this.schema = db.airline;
    }

    addAirline(airline) {
        return this.schema
        .create(airline)
    }

    getAllAirline() {
        return this.schema
        .find();
    }

    getAirline(name) {
        return this.schema
        .findOne({name : { $regex : new RegExp(name, "i") }});
    }

    updateAirline(filter, update) {
        return this.schema
        .findOneAndUpdate({name : { $regex : new RegExp(filter, "i") }}, update, {returnOriginal : false});
    }

    deleteAirline(name, toDelete) {
        if(toDelete) {
            return this.schema
            .deleteOne({name});
        }
    }

    async getFlightsByAirline(name) {
        let airline = await this.schema.findOne({name : { $regex : new RegExp(name, "i") }});
        let airlineID = airline._id;

        return await db.flight.find({airline : airlineID}, {airline : 0});
    }
}

const airlineService = new AirlineService();

module.exports = { airlineService };