const ticketHandler = require('../handlers/ticketHandler');

module.exports = [
  {
    method: 'GET',
    path: '/tickets',
    handler: ticketHandler.getAllTickets,
  },
  {
    method: 'GET',
    path: '/tickets/{ticketID}',
    handler: ticketHandler.getTicketById,
  }
];