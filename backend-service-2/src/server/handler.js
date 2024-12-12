const { getAllTemples, getAllArtifacts,updateBookmark,updateRead } = require('../services/getData');

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

async function updateBookmarkHandler(request, h) {
  const {artifactId, isBookmark } = request.payload;
  const userID = request.auth.credentials.id;


  try {
      // Validasi input
      if (typeof artifactId !== 'number' || typeof isBookmark !== 'boolean') {
          return h.response({ error: 'Invalid payload' }).code(400);
      }

      // Panggil fungsi updateBookmark
      const result = await updateBookmark(userID, artifactId, isBookmark);

      // Berikan respons sukses
      return h.response(result).code(200);
  } catch (error) {
      console.error('Error in updateBookmarkHandler:', error);
      return h.response({ error: 'Failed to update bookmark' }).code(500);
  }
}

async function updateReadHandler(request, h) {
  const {artifactId }= request.payload;
  const userID = request.auth.credentials.id;

  try {
      // Validasi input
      if (typeof artifactId !== 'number') {
          return h.response({ error: 'Invalid payload' }).code(400);
      }

      // `is_read` akan selalu true
      const is_read = true;

      // Panggil fungsi updateRead
      const result = await updateRead(userID, artifactId, is_read);

      // Berikan respons sukses
      return h.response(result).code(200);
  } catch (error) {
      console.error('Error in updateReadHandler:', error);
      return h.response({ error: 'Failed to update read status' }).code(500);
  }
}


module.exports = {getAllTemplesHandler, getAllArtifactsHandler,updateBookmarkHandler,updateReadHandler} ;