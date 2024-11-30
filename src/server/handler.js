const { getAllTemples, getTemplesById, getAllArtifacts, getArtifactsById } = require('../services/getData');

async function getAllTemplesHandler(request,h) {
  const data = await getAllTemples();
  const response=h.response({
    status:'success',
    data:data
  });
  return response;

}

async function getTemplesByIdHandler(request, h) {
  const { templeId } = request.params;
  const data = await getTemplesById(templeId);
  if (data.length===0){
    const response=h.response({
      status:'fail',
      message:'Temple not found'
    });
    response.code(404);
    return response;
  }
  const response=h.response({
    status:'success',
    data:data
  });
  return response;

}

async function getAllArtifactsHandler(request, h) {
  const { templeId } = request.params;
  const { userId } = request.payload;
  const data = await getAllArtifacts(templeId, userId);
  const response=h.response({
    status:'success',
    data:data
  });
  return response;

}

async function getArtifactsByIdHandler(request, h) {
  const { artifactId } = request.params;
  const { userId } = request.payload;
  const data = await getArtifactsById(artifactId, userId);
  if (data.length===0){
    const response=h.response({
      status:'fail',
      message:'Artifact not found'
    });
    response.code(404);
    return response;
  }
  const response=h.response({
    status:'success',
    data:data
  });
  return response;
}

module.exports = {getAllTemplesHandler, getTemplesByIdHandler, getAllArtifactsHandler, getArtifactsByIdHandler} ;