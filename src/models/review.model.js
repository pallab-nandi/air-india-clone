const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'users',
        required : true
    },
    flight : {
        type : mongoose.Types.ObjectId,
        ref : 'flights',
        required : true
    },
    ticket_id : {
        type : mongoose.Types.ObjectId,
        ref : 'tickets',
        required : true,
        unique : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        min : 10
    },
    ratings : {
        type : Number,
        required : true,
        min : 1,
        max : 10
    }
}, { timestamps : true })

const ReviewModel = mongoose.model('reviews', reviewSchema);

module.exports = { ReviewModel }