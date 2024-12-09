const { getAllTemplesHandler, getAllArtifactsHandler } = require('./handler');


const routes = [
  {
    method:'GET',
    path:'/temples',
    handler: getAllTemplesHandler,
  },
  {
    method:'GET',
    path:'/temples/{templeId}/artifacts',
    handler:getAllArtifactsHandler,
  },
];

module.exports = routes;