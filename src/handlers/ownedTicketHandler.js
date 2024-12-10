const db = require('../config/database');

module.exports = {
  async getOwnedTickets(request, h) {
    try {
      const userId = request.auth.credentials.userID;

      // Mendapatkan semua transaksi user
      const [tickets] = await db.query(`
        SELECT 
          t.transactionID as transactionID,
          t.valid_date,
          t.ticket_quantity,
          t.total_price,
          t.payment_method,
          t.status as transaction_status,
          t.transaction_date as purchase_date,
          tk.price as ticket_price,
          tk.description as ticket_description,
          tmp.title as temple_name,
          tmp.location_url as temple_location
        FROM Transaction t
        JOIN Ticket tk ON t.ticketID = tk.ticketID
        JOIN Temple tmp ON tk.templeID = tmp.templeID
        WHERE t.userID = ? AND t.status = 'pending'
        ORDER BY t.transaction_date DESC
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
      const userId = request.auth.credentials.userID;
      const { transactionId } = request.params;

      // verifikasi transaksi bahwa milik pengguna
      const [transactions] = await db.query(`
            SELECT * FROM Transaction
            WHERE transactionID = ? AND userID = ? AND status = 'pending'
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
          ot.ownedTicketID as owned_ticketsID,
          ot.userID
          ot.unique_code,
          ot.usage_status,
          t.valid_date,
          t.ticket_quantity,
          t.total_price,
          t.payment_method,
          t.transaction_date as purchase_date,
          tk.price as ticket_price,
          tk.description as ticket_description,
          tmp.title as temple_name,
          tmp.location_url
        FROM OwnedTicket ot
        JOIN Transaction t ON ot.transactionID = t.transactionID
        JOIN Ticket tk ON ot.ticketID = tk.ticketID
        JOIN Temple tmp ON tk.templeID = tmp.templeID
        WHERE ot.userID = ? AND t.transaction_id = ?
        ORDER BY ot.ownedTicketID ASC
      `, [userId, transactionId]);

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