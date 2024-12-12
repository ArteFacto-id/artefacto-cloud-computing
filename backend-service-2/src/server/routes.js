const { getAllTemplesHandler, getAllArtifactsHandler,updateBookmarkHandler,updateReadHandler } = require('./handler');


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
  {
    method:'POST',
    path:'/bookmark',
    handler:updateBookmarkHandler,
  },
  {
    method:'POST',
    path:'/read',
    handler:updateReadHandler,
  },
];

module.exports = routes;