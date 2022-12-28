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

    getFlightByName(name) {
        return this.schema
        .findOne({name});
    }

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
        
        let customs = [];

        if(filters.maxPrice) {
            customs.push({price : {$lte : filters.maxPrice}});
        }

        if(filters.minPrice) {
            customs.push({price : {$gte : filters.minPrice}});
        }

        if(filters.arrivalAirport) {
            customs.push({arrivalAirport : { $regex : new RegExp(filters.arrivalAirport, "i") }});
        }
        
        if(filters.departureAirport) {
            customs.push({departureAirport : { $regex : new RegExp(filters.departureAirport, "i") }});
        }

        if(filters.name) {
            customs.push({name : { $regex : new RegExp(filters.name, "i") }});
        }

        if(filters.airline) {
            customs.push({airline : { $regex : new RegExp(filters.airline, "i") }});
        }

        if((filters.sort || (filters.sort && filters.sortType)) && customs.length != 0) {
            if(filters.sortType == 'desc') {
                let sortObj = {};
                let sort = filters.sort;
                sortObj[sort] = -1;
                return this.schema.find({$and : customs}).sort(sortObj).collation({locale: "en_US", numericOrdering: true})
            }
            return this.schema.find({$and : customs}).sort(filters.sort).collation({locale: "en_US", numericOrdering: true})
        } else if(filters.sort || (filters.sort && filters.sortType)) {
            if(filters.sortType == 'desc') {
                let sortObj = {};
                let sort = filters.sort;
                sortObj[sort] = -1;
                return this.schema.find().sort(sortObj).collation({locale: "en_US", numericOrdering: true})
            }
            return this.schema.find().sort(filters.sort).collation({locale: "en_US", numericOrdering: true})
        } else {
            return this.schema.find({$and : customs});
        }
    }
}

const flightService = new FlightService();

module.exports = { flightService };