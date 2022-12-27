const express = require('express');
const ticketController = require('../../src/controllers/ticket.controller');
const ticketValidator = require('../../src/validators/ticket.validator');

const router = express.Router();


//Fetch all Tickets
router.get('/all', ticketController.getTickets);

//Fetch Tickets by ID
router.get('/:id', [ticketValidator.validID], ticketController.getTicketsByID);

//Add Tickets
router.post('/add', [ticketValidator.validBody], ticketController.bookTicket);

//Update Ticket
router.put('/:id/edit', [ticketValidator.validID], ticketController.updateTicket);

//Delete Ticket
router.delete('/:id', [ticketValidator.validID], ticketController.deleteTicket);


module.exports = router;