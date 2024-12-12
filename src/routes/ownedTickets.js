const ownedTicketHandler = require('../handlers/ownedTicketHandler');

module.exports = [
  {
    method: 'GET',
    path: '/ownedTickets',
    handler: ownedTicketHandler.getOwnedTickets,
  },
  {
    method: 'GET',
    path: '/ownedTickets/{transactionId}',
    handler: ownedTicketHandler.getOwnedTicketDetails,
  }
];