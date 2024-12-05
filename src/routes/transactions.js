const transactionHandler = require('../handlers/transactionHandler');
const { createTransactionSchema } = require('../schema/schema');

module.exports = [
  {
    method: 'POST',
    path: '/transactions',
    handler: transactionHandler.createTransaction,
    options: {
      validate: {
        payload: createTransactionSchema,
      }
    }
  },
  {
    method: 'GET',
    path: '/transactions/{id}',
    handler: transactionHandler.getTransactionById,
  },
  {
    method: 'GET',
    path: '/transactions',
    handler: transactionHandler.getUserTransactions,
  }
];