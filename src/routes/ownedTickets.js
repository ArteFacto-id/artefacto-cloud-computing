const ownedTicketHandler = require('../handlers/ownedTicketHandler');
const validateToken = require('../middleware/authMiddleware');

module.exports = [
  {
    method: 'GET',
    path: '/ownedTickets',
    handler: ownedTicketHandler.getOwnedTickets,
    options: {
      pre: [{ method: validateToken }]
    }
  },
  {
    method: 'GET',
    path: '/ownedTickets/{transactionId}',
    handler: ownedTicketHandler.getTicketDetails,
    options: {
      pre: [{ method: validateToken }]
    }
  }
];