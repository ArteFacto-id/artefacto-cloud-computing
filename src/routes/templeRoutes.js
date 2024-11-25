const templeHandler = require('../handlers/templeHandler');

module.exports = [
  {
    method: 'GET',
    path: '/temples',
    handler: templeHandler.getAllTemples
  },
  {
    method: 'GET',
    path: '/temples/{id}',
    handler: templeHandler.getTempleById
  }
];