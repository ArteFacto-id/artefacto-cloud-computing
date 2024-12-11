const db = require('../config/database');
const crypto = require('crypto');

module.exports = {
  async createTransaction(request, h) {
    try {
      const userID = request.auth.credentials.userID;
      const { ticketID, validDate, ticketQuantity, paymentMethod } = request.payload;

      // Mendapatkan detail tiket
      const [tickets] = await db.query('SELECT * FROM Ticket WHERE ticketID = ?', [ticketID]);
      if (tickets.length === 0) {
        return h.response({
          status: 'error',
          message: 'Tiket tidak ditemukan'
        }).code(404);
      }

      const ticket = tickets[0];

      // Check ketersediaan tiket
      if (ticket.quota < ticketQuantity) {
        return h.response({
          status: 'error',
          message: 'Tiket tidak tersedia'
        }).code(400);
      }

      // Menghitung total harga
      const totalPrice = ticket.price * ticketQuantity;

      // Membuat Transaksi
      const [result] = await db.query(`
        INSERT INTO Transaction
        (userID, ticketID, valid_date, ticket_quantity, total_price, payment_method, status)
        VALUES (?, ?, ?, ?, ?, ?, 'Completed')
      `, [userID, ticketID, validDate, ticketQuantity, totalPrice, paymentMethod]);

      // Generate kode unik untuk setiap tiket pengguna
      const transactionID = result.insertId;

      for (let i = 0; i < ticketQuantity; i++) {
        const uniqueCode = crypto.randomBytes(5).toString('hex');
        await db.query(`
          INSERT INTO OwnedTicket
          (ownedTicketID, userID, unique_code, usage_status)
          VALUES (?, ?, ?, 'Unused')  
        `, [transactionID, userID, uniqueCode]);
      }

      // Quota tiket diperbarui
      await db.query(`
        UPDATE Ticket
        SET quota = quota - ? WHERE ticketID = ? AND quota >= ?
      `, [ticketQuantity, ticketID, ticketQuantity]);

      // Mendapatkan detail transaksi
      const [transactions] = await db.query(`
        SELECT t.*, u.username as user_name, tk.price as ticket_price, tmp.title as temple_name
        FROM Transaction t
        JOIN User u ON t.userID = u.userID
        JOIN Ticket tk ON t.ticketID = tk.ticketID
        JOIN Temple tmp ON tk.templeID = tmp.templeID
        WHERE t.transactionID = ?
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
      const { transactionID } = request.params;
      const userID = request.auth.credentials.userID;

      const [transactions] = await db.query(`
        SELECT t.*, u.username as user_name, tk.price as ticket_price, tmp.title as temple_name
        FROM Transaction t
        JOIN User u ON t.userID = u.userID
        JOIN Ticket tk ON t.ticketID = tk.ticketID
        JOIN Temple tmp ON tk.templeID = tmp.templeID
        WHERE t.transactionID = ? AND t.userID = ?
      `, [transactionID, userID]);

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
      const userID = request.auth.credentials.userID;

      const [transactions] = await db.query(`
        SELECT t.*, u.username as user_name, tk.price as ticket_price, tmp.title as temple_name
        FROM Transaction t
        JOIN User u ON t.userID = u.userID
        JOIN Ticket tk ON t.ticketID = tk.ticketID
        JOIN Temple tmp ON tk.templeID = tmp.templeID
        WHERE t.userID = ?
        ORDER BY t.transaction_date DESC
      `, [userID]);

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