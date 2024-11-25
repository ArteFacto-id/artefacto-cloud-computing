const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('@hapi/jwt');

module.exports = {
  async register(request, h) {
    try {
      const { username, password } = request.payload;

      const [existing] = await db.query('SELECT id FROM users WHERE username = ?', [username]);
      if (existing.length > 0) {
        return h.response({ error: 'Username already exists' }).code(400);
      }

      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);

      const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashPassword]);
      return h.response({
        message: 'User registered succesfully',
        userId: result.insertId
      }).code(201);
    } catch (error) {
      console.error(error);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  async login(request, h) {
    try {
      const { username, password } = request.payload;

      // mendapatkan user
      const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
      if (users.length === 0) {
        return h.response({ error: 'Invalid username or password' }).code(401);
      }

      const user = users[0];

      // verifikasi password
      const Invalid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return h.response({ error: 'Invalid username or password' }).code(401);
      }

      // generate token
      const token = jwt.token.generate(
        {
          userId: user.id,
          username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return h.response({
        message: 'Login succesful', token
      }).code(200);
    } catch (error) {
      console.error(error);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  async getProfile(request, h) {
    try {
      const userId = request.auth.credentials.userId;

      const [users] = await db.query('SELECT id, username, created_at FROM users WHERE id = ?', [userId]);

      if (users.length === 0) {
        return h.response({ error: 'User not found' }).code(404);
      }
      return h.response(users[0]).code(200);
    } catch (error) {
      console.error(error);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  async changePassword(request, h) {
    try {
      const userId = request.auth.credentials.userId;
      const { oldPassword, newPassword } = request.payload;

      // mendapatkan user
      const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
      if (users.length === 0) {
        return h.response({ error: 'User not found' }).code(404);
      }

      const user = users[0];

      const isValid = await bcrypt.compare(oldPassword, user.password);
      if (!isValid) {
        return h.response({ erorr: 'invalid old password' }).code(401);
      }

      // hash password baru
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // update password
      await db.query('UPDATE  users SET SET password = ? WHERE id = ?', [hashedPassword, userId]);
      return h.response({ message: 'Password updated successfully' }).code(200);
    } catch (error) {
      console.error(error);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  }
};