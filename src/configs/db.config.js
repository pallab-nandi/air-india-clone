if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports = {
    development: 'mongodb://127.0.0.1/air-india-clone',
    production: process.env.DB_URI
}