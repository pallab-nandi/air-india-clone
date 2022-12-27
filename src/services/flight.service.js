const { db } = require('../models/index.model');

class FlightService {
    schema;
    constructor() {
        this.schema = db.flight;
    }

    getAllFlights(filters) {

        if(Object.values(filters).length != 0) {
            return this.#filterFunc(filters);
        }

        return this.schema
        .find();
    }

    // getFlightByName(name) {
    //     return this.schema
    //     .findOne({name});
    // }

    async addFlight(flight) {
        let airline = await db.airline.findOne({name : { $regex : new RegExp(filters.airline, "i") }});
        let airlineID = airline._id;
        flight.airline = airlineID;

        return this.schema
        .create(flight);
    }

    updateFlight(filter, update) {
        return this.schema
        .findOneAndUpdate({name : { $regex : new RegExp(filter, "i") }}, update, {returnOriginal : false});
    }

    deleteFlight(name, toDelete) {
        if(toDelete) {
            return this.schema
            .deleteOne({name : { $regex : new RegExp(name, "i") }});
        }
    }

    //Search and Filter functions

    #filterFunc(filters) {
        if(filters.price && filters.price == 'asc') {
            return this.schema.find().sort('price');
        } else if(filters.price && filters.price == 'desc') {
            return this.schema.find().sort('-price');
        }

        if(filters.duration && filters.duration == 'asc') {
            return this.schema.find().sort('duration').collation({locale: "en_US", numericOrdering: true});
        } else if(filters.duration && filters.duration == 'desc') {
            return this.schema.find().sort('-duration').collation({locale: "en_US", numericOrdering: true});
        }

        if(filters.maxPrice) {
            return this.schema.find({price : {$lte : filters.maxPrice}});
        }

        if(filters.minPrice) {
            return this.schema.find({price : {$gte : filters.minPrice}});
        }

        if(filters.arrivalAirport) {
            return this.schema.find({arrivalAirport : { $regex : new RegExp(filters.arrivalAirport, "i") }});
        }
        
        if(filters.departureAirport) {
            return this.schema.find({departureAirport : { $regex : new RegExp(filters.departureAirport, "i") }});
        }

        if(filters.name && filters.sort && filters.sort == 'desc') {
            return this.schema.find({name : { $regex : new RegExp(filters.name, "i") }}).sort('name');
        } else if(filters.name || (filters.name && filters.sort && filters.sort == 'asc')) {
            return this.schema.find({name : { $regex : new RegExp(filters.name, "i") }}).sort('-name');
        }

        if(filters.airline && filters.sort && filters.sort == 'desc') {
            return this.schema.find({airline : { $regex : new RegExp(filters.airline, "i") }}).sort('name');
        } else if(filters.airline || (filters.airline && filters.sort == 'asc')) {
            return this.schema.find({airline : { $regex : new RegExp(filters.airline, "i") }}).sort('-name');
        }
    }
}

const flightService = new FlightService();

module.exports = { flightService };