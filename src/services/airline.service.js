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
        .findOne({name});
    }

    updateAirline(filter, update) {
        return this.schema
        .findOneAndUpdate(filter, update, {returnOriginal : false});
    }

    deleteAirline(name, toDelete) {
        if(toDelete) {
            return this.schema
            .deleteOne({name});
        }
    }
}

const airlineService = new AirlineService();

module.exports = { airlineService };