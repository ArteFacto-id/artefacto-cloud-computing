const db = require('../config/database');

module.exports = {
  async getAllTickets(request, h) {
    try {
      const [tickets] = await db.query(`
        SELECT t.*, tmp.title as temple_name, tmp.location_url
        FROM Ticket t 
        JOIN Temple tmp ON t.templeID = tmp.templeID 
        WHERE t.quota > 0
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
      const { ticketID } = request.params;
      const [tickets] = await db.query(`
        SELECT t.*, tmp.title as temple_name, tmp.location_url
        FROM Ticket t 
        JOIN Temple tmp ON t.templeID = tmp.templeID 
        WHERE t.ticketID = ?
      `, [ticketID]);

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