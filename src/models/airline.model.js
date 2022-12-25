const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    website : {
        type : String,
        lowercase : true
    }
}, { timestamps : true });

const AirlineModel = mongoose.model('airlines', airlineSchema);

module.exports = { AirlineModel }