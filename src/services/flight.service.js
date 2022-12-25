const { db } = require('../models/index.model');

class FlightService {
    schema;
    constructor() {
        this.schema = db.flight;
    }

    getAllFlights() {
        return this.schema
        .find();
    }

    getFlightByName(name) {
        return this.schema
        .findOne({name});
    }

    async addFlight(flight) {
        let airline = await db.airline.findOne({name : flight.airline});
        let airlineID = airline._id;
        flight.airline = airlineID;

        return this.schema
        .create(flight);
    }

    updateFlight(filter, update) {
        return this.schema
        .findOneAndUpdate(filter, update, {returnOriginal : false});
    }

    deleteFlight(name, toDelete) {
        if(toDelete) {
            return this.schema
            .deleteOne({name});
        }
    }
}

const flightService = new FlightService();

module.exports = { flightService };