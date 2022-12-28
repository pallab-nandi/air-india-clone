const colors = require('colors');
const mongoose = require('mongoose');

const dbConfig = require('../configs/db.config');

mongoose.set('strictQuery', true);

// connecting to database
const connect = () => {
    console.log('Initializing MongoDB connection...')
    mongoose.connect(dbConfig.production)
    .then(() => console.log('MongoDB connected successfully'.bold.cyan))
    .catch(err => console.log('Error while connecting to Database'.bold.red, err));
}

module.exports = { connect };