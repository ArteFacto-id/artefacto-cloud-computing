const db = require('../config/database');

module.exports = {
  async getAllTemples(request, h) {
    try {
      const [rows] = await db.query('SELECT * FROM temples');
      return h.response(rows).code(200);
    } catch (error) {
      console.error(error);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  async getTempleById(request, h) {
    try {
      const { id } = request.params;
      const [rows] = await db.query('SELECT * FROM temples WHERE id = ?', [id]);

      if (rows.length === 0) {
        return h.response({ error: 'Temple not found' }).code(404);
      }

      return h.response(rows[0]).code(200);
    } catch (error) {
      console.error(error);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  }
};