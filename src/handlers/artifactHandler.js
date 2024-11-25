const db = require('../config/database');

module.exports = {
  async getArtifactsByTemple(request, h) {
    try {
      const { templeId } = request.params;
      const [rows] = await db.query('SELECT * FROM artifacts WHERE temple_id = ?', [templeId]);
      return h.response(rows).code(200);
    } catch (error) {
      console.error(error);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  async getArtifactById(request, h) {
    try {
      const { id } = request.params;
      const [rows] = await db.query('SELECT * FROM artifacts WHERE id = ?', [id]);

      if (rows.length === 0) {
        return h.response({ error: 'Artifact not found' }).code(404);
      }

      return h.response(rows[0]).code(200);
    } catch (error) {
      console.error(error);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  }
};