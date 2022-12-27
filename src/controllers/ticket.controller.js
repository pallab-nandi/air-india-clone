const colors = require('colors');
const { ticketService } = require('../services/ticket.service');

async function bookTicket(req, res) {

    const ticket = req.body;

    return await ticketService
    .bookTicket(ticket)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(201);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'Ticket Booked successfully';
        returnValues.data = ticket;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while booking Ticket'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while booking Ticket'
        }))
    })
}

async function getTickets(req, res) {

    let userID = "63a5cb01de935cdb6ee2711d";
    let filters = req.query;

    return await ticketService
    .getAllTicket(userID, filters)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(200);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'All Tickets fetched successfully';
        returnValues.data = data;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while fetching Tickets'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while fetching Tickets'
        }))
    })
}

async function getTicketsByID(req, res) {

    const ticketID = req.params.id;

    return await ticketService
    .getTicketByID(ticketID)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(200);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'Ticket fetched successfully';
        returnValues.data = data;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while fetching Ticket'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while fetching Ticket'
        }))
    })
}

async function updateTicket(req, res) {
    const ticketID = req.params.id;
    const update = req.body;

    return await ticketService
    .updateTicket(ticketID, update)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(202);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'Ticket updated successfully';
        returnValues.data = data;
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while updating Ticket'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while updating Ticket'
        }))
    })
}

async function deleteTicket(req, res) {
    let toDelete = req.query.delete;
    let ticketID = req.params.id;

    return await ticketService
    .deleteTicket(ticketID, toDelete)
    .then((data) => {
        console.log(data);
        res.setHeader('content-type', 'application/json');
        res.writeHead(202);
        let returnValues = {};
        returnValues.status = 'success';
        returnValues.message = 'Ticket deleted successfully';
        res.end(JSON.stringify(returnValues));
    })
    .catch((err) => {
        console.log('Error while deleting Ticket'.bold.bgRed, err);
        res.setHeader('content-type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({
            success : 'fail',
            message : 'Error while deleting Ticket'
        }))
    })
}

module.exports = {
    bookTicket,
    getTickets,
    getTicketsByID,
    updateTicket,
    deleteTicket
}