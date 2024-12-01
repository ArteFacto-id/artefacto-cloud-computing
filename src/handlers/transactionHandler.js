const db = require('../config/database');
const transactions = require('../routes/transactions');

module.exports = {
  async createTransaction(request, h) {
    try {
      const userId = request.auth.credentials.id;
      const { ticketId, validDate, ticketQuantity, paymentMethod } = request.payload;

      // Mendapatkan detail tiket
      const [tickets] = await db.query('SELECT * FROM tickets WHERE id = ?', [ticketId]);
      if (tickets.length === 0) {
        return h.response({
          status: 'error',
          message: 'Tiket tidak ditemukan'
        }).code(404);
      }

      const ticket = tickets[0];

      // Check ketersediaan tiket
      if (ticket.status === 'unavailable' || ticket.quota < ticketQuantity) {
        return h.response({
          status: 'error',
          message: 'Tiket tidak tersedia atau kuota tidak mencukupi'
        }).code(400);
      }

      // Menghitung total harga
      const totalPrice = ticket.price * ticketQuantity;

      // Membuat Transaksi
      const [result] = await db.query(`
        INSERT INTO transactions
        (user_id, ticket_id, valid_date, ticket_quantity, total_price, payment_method)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [userId, ticketId, validDate, ticketQuantity, totalPrice, paymentMethod]);

      // Quota tiket diperbarui
      await db.query(`
        UPDATE tickets
        SET quota = quota - ?, status = CASE WHEN (quota - ?) <= 0 THEN 'unavailable' ELSE status END
        WHERE id = ?
      `, [ticketQuantity, ticketQuantity, ticketId]);

      const [transactions] = await db.query(`
        SELECT t.*, u.name as user_name, tk.price as ticket_price, tmp.name as temple_name
        FROM transactions t
        JOIN users u ON t.user_id = u.id
        JOIN tickets tk ON t.ticket_id = tk.id
        JOIN temples tmp ON tk.temple_id = tmp.id
        WHERE t.id = ?
      `, [result.insertId]);

      return h.response({
        status: 'success',
        message: 'Transaksi berhasil dibuat',
        data: {
          transaction: transactions[0]
        }
      }).code(201);
    } catch (error) {
      console.error(error);
      return h.response({
        status: 'error',
        message: 'Internal server error'
      }).code(500);
    }
  },

  async getTransactionById(request, h) {
    try {
      const { id } = request.params;
      const userId = request.auth.credentials.id;

      const [transaction] = await db.query(`
        SELECT t.*, u.name as user_name, tk.price as ticket_price, tmp.name as temple_name
        FROM transactions t
        JOIN users u ON t.user_id = u.id
        JOIN tickets tk ON t.ticket_id = tk.id
        JOIN temples tmp ON tk.temple_id = tmp.id
        WHERE t.id = ? AND t.user_id = ?
      `, [id, userId]);

      if (transactions.length === 0) {
        return h.response({
          status: 'error',
          message: 'Transaksi tidak ditemukan'
        }).code(404);
      }

      return h.response({
        status: 'success',
        message: 'Detail transaksi berhasil dimuat',
        data: {
          transaction: transactions[0]
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

  async getUserTransactions(request, h) {
    try {
      const userId = request.auth.credentials.id;

      const [transactions] = await db.query(`
        SELECT t.*, u.name as user_name, tk.price as ticket_price, tmp.name as temple_name
        FROM transactions t
        JOIN users u ON t.user_id = u.id
        JOIN tickets tk ON t.ticket_id = tk.id
        JOIN temples tmp ON tk.temple_id = tmp.id
        WHERE t.user_id = ?
        ORDER BY t.created_at DESC
      `, [userId]);

      return h.response({
        status: 'success',
        message: 'Daftar transaksi berhasil dimuat',
        data: {
          transactions
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