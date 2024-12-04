const authRoutes = require('./auth');
const ticketRoutes = require('./tickets');
const transactionRoutes = require('./transactions');
const ownedTicketRoutes = require('./ownedTickets');

module.exports = [
  ...authRoutes,
  ...ticketRoutes,
  ...transactionRoutes,
  ...ownedTicketRoutes
];
