const { getAllTemplesHandler, getTemplesByIdHandler, getAllArtifactsHandler, getArtifactsByIdHandler } = require('./handler');


const routes = [
  {
    method:'GET',
    path:'/temples',
    handler: getAllTemplesHandler,
  },
  {
    method:'GET',
    path:'/temples/{templeId}',
    handler:getTemplesByIdHandler,
  },
  {
    method:'GET',
    path:'/temples/{templeId}/artifacts',
    handler:getAllArtifactsHandler,
  }, {
    method:'GET',
    path:'/temples/{templeId}/artifacts/{artifactId}',
    handler:getArtifactsByIdHandler,
  }
];

module.exports = routes;