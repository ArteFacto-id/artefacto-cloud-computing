const authRoutes = require('./auth');
const ticketRoutes = require('./tickets');
const transactionRoutes = require('./transactions');

module.exports = [
  ...authRoutes,
  ...ticketRoutes,
  ...transactionRoutes
];
