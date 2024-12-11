const db = require('../config/database');

module.exports = {
  async getOwnedTickets(request, h) {
    try {
      const userId = request.auth.credentials.userID;
      console.log(userId)

      // Mendapatkan semua transaksi user
      const [tickets] = await db.query(`
SELECT 
    t.transactionID AS transaction_id,
    t.valid_date AS valid_date,
    t.ticket_quantity AS ticket_quantity,
    t.total_price AS total_price,
    t.payment_method AS payment_method,
    t.status AS transaction_status,
    t.transaction_date AS purchase_date,
    tk.price AS ticket_price,
    tk.description AS ticket_description,
    tmp.title AS temple_name,
    tmp.location_url AS temple_location
FROM 
    Transaction t
    INNER JOIN Ticket tk ON t.ticketID = tk.ticketID
    INNER JOIN Temple tmp ON tk.templeID = tmp.templeID
WHERE 
    t.userID = ?
ORDER BY 
    t.transaction_date DESC;

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

  async getOwnedTicketDetails(request, h) {
    try {
      const userId = request.auth.credentials.userID;
      const { transactionId } = request.params;

      // verifikasi transaksi bahwa milik pengguna
      const [transactions] = await db.query(`
            SELECT * FROM Transaction
            WHERE transactionID = ? AND userID = ? AND status = 'pending'
        `, [transactionId, userId]);

      console.log('Transactions:', transactions);

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
          ot.unique_code,
          ot.usage_status,
          t.transaction_date,
          t.valid_date,
          t.ticket_quantity,
          t.total_price,
          t.payment_method,
          t.status as transaction_status,
          tk.price as ticket_price,
          tk.description as ticket_description,
          tmp.title as temple_name,
          tmp.location_url
        FROM OwnedTicket ot
        JOIN Transaction t ON ot.userID = t.userID
        JOIN Ticket tk ON t.ticketID = tk.ticketID
        JOIN Temple tmp ON tk.templeID = tmp.templeID
        WHERE t.transactionID = ? AND ot.userID = ? 
      `, [transactionId, userId]);

      console.log('Details:', details);

      return h.response({
        status: 'success',
        message: 'Detail tiket berhasil dimuat',
        data: {
          ticketDetails: details
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