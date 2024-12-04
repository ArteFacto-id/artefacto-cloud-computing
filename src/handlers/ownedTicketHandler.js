const db = require('../config/database');

module.exports = {
  async getOwnedTickets(request, h) {
    try {
      const userId = request.auth.credentials.id;

      // Mendapatkan semua transaksi user
      const [tickets] = await db.query(`
        SELECT 
          t.id as transaction_id,
          t.valid_date,
          t.ticket_quantity,
          t.total_price,
          t.payment_method,
          t.status as transaction_status,
          t.created_at as purchase_date,
          tk.price as ticket_price,
          tk.description as ticket_description,
          tmp.name as temple_name,
          tmp.location as temple_location
        FROM transactions t
        JOIN tickets tk ON t.ticket_id = tk.id
        JOIN temples tmp ON tk.temple_id = tmp.id
        WHERE t.user_id = ? AND t.status = 'pending'
        ORDER BY t.created_at DESC
      `, [userId]);

      return h.response({
        status: 'success',
        message: 'Daftar tiket berhasil dimuat',
        data: {
          ownedTickets: tickets
        },
      }).code(200);
    } catch (error) {
      console.error(error);
      return h.response({
        status: 'error',
        message: 'Internal server serror'
      }).code(500);
    }
  },

  async getTicketDetails(request, h) {
    try {
      const userId = request.auth.credentials.id;
      const { transactionId } = request.params;

      // verifikasi transaksi bahwa milik pengguna
      const [transactions] = await db.query(`
            SELECT * FROM transactions
            WHERE id = ? AND user_id = ? AND status = 'pending'
        `, [transactionId, userId]);

      if (transactions.length === 0) {
        return h.response({
          status: 'error',
          message: 'Transaksi tidak ditemukan'
        }).code(404);
      }

      // Mendapatkan detail transaksi pengguna
      const [details] = await db.query(`
        SELECT 
          ot.id as owned_tickets_id,
          ot.unique_code,
          ot.usage_status,
          t.valid_date,
          t.ticket_quantity,
          t.total_price,
          t.payment_method,
          t.created_at as purchase_date,
          tk.price as ticket_price,
          tk.description as ticket_description,
          tmp.name as temple_name,
          tmp.location as temple_location
        FROM owned_tickets ot
        JOIN transactions t ON ot.transaction_id = t.id
        JOIN tickets tk ON ot.ticket_id = tk.id
        JOIN temples tmp ON tk.temple_id = tmp.id
        WHERE ot.transaction_id = ?
        ORDER BY ot.id ASC
      `, [transactionId]);

      return h.response({
        status: 'success',
        message: 'Detail tiket berhasil dimuat',
        data: {
          ticketDetails: details
        }
      }).code(200);
    } catch (error) {
      console.error.apply(error);
      return h.response({
        status: 'error',
        message: 'Internal server error'
      }).code(500);
    }
  }
};