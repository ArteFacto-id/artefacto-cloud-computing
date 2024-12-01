const db = require('../config/database');

module.exports = {
  async getAllTickets(request, h) {
    try {
      const [tickets] = await db.query(`
        SELECT t.*, tmp.name as temple_name, tmp.location
        FROM tickets t 
        JOIN temples tmp ON t.temple_id = tmp.id 
        WHERE t.status = 'available' AND t.quota > 0
      `);

      return h.response({
        status: 'success',
        message: 'Daftar tiket berhasil dimuat',
        data: {
          tickets
        }
      }).code(200);
    } catch (error) {
      console.error(error);
      return h.response({
        status: 'error',
        message: 'Internal server error'
      }).code(500);
    }
  },

  async getTicketById(request, h) {
    try {
      const { id } = request.params;
      const [tickets] = await db.query(`
        SELECT t.*, tmp.name as temple_name, tmp.location
        FROM tickets t 
        JOIN temples tmp ON t.temple_id = tmp.id 
        WHERE t.id = ?
      `, [id]);

      if (tickets.length === 0) {
        return h.response({
          status: 'error',
          message: 'Tiket tidak ditemukan',
        }).code(404);
      }

      return h.response({
        status: 'success',
        message: 'Detail tiket berhasil dimuat',
        data: {
          ticket: tickets[0]
        }
      }).code(200);
    } catch (error) {
      console.error(error);
      return h.response({
        status: 'error',
        message: 'Internal server error'
      }).code(500);
    }
  }
};