const express = require('express');
const router = express.Router();


const helplineRoute = require('./helpline.routes');
const authRoute = require('./auth.routes');
const airlineRoute = require('./airline.routes');
const flightRoute = require('./flight.routes');
const ticketRoute = require('./ticket.routes');
const reviewRoute = require('./review.routes');
const userRoute = require('./user.routes');


router.use('/helpline', helplineRoute);
router.use('/auth', authRoute);
router.use('/airline', airlineRoute);
router.use('/flight', flightRoute);
router.use('/ticket', ticketRoute);
router.use('/review', reviewRoute);
router.use('/user', userRoute);


module.exports = router;