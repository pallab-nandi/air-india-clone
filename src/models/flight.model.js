const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    departureAirport : {
        type : String,
        required : true
    },
    departureTime : {
        type : Date,
        required : true
    },
    arrivalAirport : {
        type : String,
        required : true
    },
    arrivalTime : {
        type : Date,
        required : true
    },
    duration : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    airline : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'airlines'
    }
}, { timestamps : true })

const FlightModel = mongoose.model('flights', flightSchema);

module.exports = { FlightModel }