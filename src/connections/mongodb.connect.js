const colors = require('colors');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

// connecting to database
const connect = () => {
    console.log('Initializing MongoDB connection...')
    mongoose.connect('mongodb://127.0.0.1/air-india-clone')
    .then(() => console.log('MongoDB connected successfully'.bold.cyan))
    .catch(err => console.log('Error while connecting to Database'.bold.red, err));
}

module.exports = { connect };