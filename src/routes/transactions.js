const transactionHandler = require('../handlers/transactionHandler');
const validateToken = require('../middleware/authMiddleware');
const { createTransactionSchema } = require('../schema/schema');

module.exports = [
  {
    method: 'POST',
    path: '/transactions',
    handler: transactionHandler.createTransaction,
    options: {
      pre: [{ method: validateToken }],
      validate: {
        payload: createTransactionSchema,
      }
    }
  },
  {
    method: 'GET',
    path: '/transactions/{id}',
    handler: transactionHandler.getTransactionById,
    options: {
      pre: [{ method: validateToken }]
    }
  },
  {
    method: 'GET',
    path: '/transactions',
    handler: transactionHandler.getUserTransactions,
    options: {
      pre: [{ method: validateToken }]
    }
  }
];