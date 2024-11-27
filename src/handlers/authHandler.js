const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('@hapi/jwt');

module.exports = {
  async register(request, h) {
    try {
      const { name, email, password, passConfirmation } = request.payload;

      // Memastikan password sesuai
      if (password !== passConfirmation) {
        return h
          .response({
            status: 'error',
            message: 'Password dan konfirmasi password tidak sesuai',
          })
          .code(400);
      }

      // Memastikan email sudah ada
      const [existing] = await db.query(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );
      if (existing.length > 0) {
        return h
          .response({
            status: 'error',
            message: 'Email sudah terdaftar',
          })
          .code(400);
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Memasukan pengguna baru
      const [result] = await db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
      );

      // Mendapatkan data pengguna
      const [userData] = await db.query(
        'SELECT id, name, email, created_at, update_at FROM users WHERE id = ?',
        [result.insertId]
      );

      return h
        .response({
          status: 'success',
          message: 'Pengguna berhasil mendaftar',
          data: {
            user: userData[0],
          },
        })
        .code(201);
    } catch (error) {
      console.error(error);
      return h
        .response({
          status: 'error',
          error: 'Internal server error',
        })
        .code(500);
    }
  },

  async login(request, h) {
    try {
      const { email, password } = request.payload;

      // Mendapatkan pengguna dengan email
      const [users] = await db.query('SELECT * FROM users WHERE email = ?', [
        email,
      ]);
      if (users.length === 0) {
        return h
          .response({
            status: 'error',
            error: 'Email atau password salah',
          })
          .code(401);
      }

      const user = users[0];

      // verifikasi password
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return h
          .response({
            status: 'error',
            error: 'Email atau password salah',
          })
          .code(401);
      }

      // Generate JWT token
      const token = jwt.token.generate(
        {
          userId: user.id,
          username: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '24h',
        }
      );

      const userData = {
        id: user.id,
        name: user.name,
        email: user.name,
        createdAt: user.created_at,
        updateAt: user.update_at,
      };

      return h
        .response({
          status: 'success',
          message: 'Berhasil Login',
          data: {
            user: userData,
            token,
          },
        })
        .code(200);
    } catch (error) {
      console.error(error);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  // async getProfile(request, h) {
  //   try {
  //     const userId = request.auth.credentials.userId;

  //     const [users] = await db.query('SELECT id, username, created_at FROM users WHERE id = ?', [userId]);

  //     if (users.length === 0) {
  //       return h.response({ error: 'User not found' }).code(404);
  //     }
  //     return h.response(users[0]).code(200);
  //   } catch (error) {
  //     console.error(error);
  //     return h.response({ error: 'Internal server error' }).code(500);
  //   }
  // },

  // async changePassword(request, h) {
  //   try {
  //     const userId = request.auth.credentials.userId;
  //     const { oldPassword, newPassword } = request.payload;

  //     // mendapatkan user
  //     const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
  //     if (users.length === 0) {
  //       return h.response({ error: 'User not found' }).code(404);
  //     }

  //     const user = users[0];

  //     // verifikasi password lama
  //     const isValid = await bcrypt.compare(oldPassword, user.password);
  //     if (!isValid) {
  //       return h.response({ erorr: 'invalid old password' }).code(401);
  //     }

  //     // hash password baru
  //     const saltRounds = 10;
  //     const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  //     // update password
  //     await db.query('UPDATE  users SET password = ? WHERE id = ?', [hashedPassword, userId]);
  //     return h.response({ message: 'Password updated successfully' }).code(200);
  //   } catch (error) {
  //     console.error(error);
  //     return h.response({ error: 'Internal server error' }).code(500);
  //   }
  // }
};
