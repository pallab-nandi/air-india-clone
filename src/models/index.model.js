const db = {};

const { AirlineModel } = require('./airline.model');
const { FlightModel } = require('./flight.model');
const { ReviewModel } = require('./review.model');
const { TicketModel } = require('./ticket.model');
const { UserModel } = require('./user.model');

db.airline = AirlineModel;
db.flight = FlightModel;
db.review = ReviewModel;
db.ticket = TicketModel;
db.user = UserModel;



module.exports = { db };