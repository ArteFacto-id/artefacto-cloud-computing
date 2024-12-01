const ticketHandler = require('../handlers/ticketHandler');
const validateToken = require('../middleware/authMiddleware');

module.exports = [
  {
    method: 'GET',
    path: '/tickets',
    handler: ticketHandler.getAllTickets,
    options: {
      pre: [{ method: validateToken }]
    }
  },
  {
    method: 'GET',
    path: '/tickets/{id}',
    handler: ticketHandler.getTicketById,
    options: {
      pre: [{ method: validateToken }]
    }
  }
];