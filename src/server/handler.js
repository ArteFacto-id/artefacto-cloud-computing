const { getAllTemples, getAllArtifacts } = require('../services/getData');

async function getAllTemplesHandler(request,h) {
  const data = await getAllTemples();
  const response=h.response({
    status:'success',
    data:data
  });
  return response;

}

async function getAllArtifactsHandler(request, h) {
  const { templeId } = request.params;
  const userId = request.auth.credentials.id;
  const data = await getAllArtifacts(templeId, userId);
  const response=h.response({
    status:'success',
    data:data
  });
  return response;

}



module.exports = {getAllTemplesHandler, getAllArtifactsHandler} ;