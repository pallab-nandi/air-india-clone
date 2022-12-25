const express = require('express');
const ticketController = require('../../src/controllers/ticket.controller');

const router = express.Router();


//Fetch all Tickets
router.get('/all', ticketController.getTickets);

//Fetch Tickets by ID
router.get('/:id', ticketController.getTicketsByID);

//Add Tickets
router.post('/add', ticketController.bookTicket);

//Update Ticket
router.put('/:id/edit', ticketController.updateTicket);

//Delete Ticket
router.delete('/:id', ticketController.deleteTicket);


module.exports = router;