const express = require('express');
const ticketController = require('../../src/controllers/ticket.controller');
const ticketValidator = require('../../src/validators/ticket.validator');
const authValidator = require('../../src/validators/auth.validator');

const router = express.Router();


//Fetch all Tickets
router.get('/all', [authValidator.verifyJwt], ticketController.getTickets);

//Fetch Tickets by ID
router.get('/:id', [authValidator.verifyJwt, ticketValidator.validID], ticketController.getTicketsByID);

//Add Tickets
router.post('/add', [authValidator.verifyJwt, ticketValidator.validBody], ticketController.bookTicket);

//Update Ticket
router.put('/:id/edit', [authValidator.verifyJwt, authValidator.isAdmin, ticketValidator.validID], ticketController.updateTicket);

//Cancel Ticket - ?cancel=true
router.put('/:id', [authValidator.verifyJwt, ticketValidator.validID], ticketController.updateTicket);

//Delete Ticket
router.delete('/:id', [authValidator.verifyJwt, authValidator.isAdmin, ticketValidator.validID], ticketController.deleteTicket);


module.exports = router;