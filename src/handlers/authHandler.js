const db = require('../config/database');
const bcrypt = require('bcrypt');
const { token } = require('@hapi/jwt');

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
        'SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?',
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
          message: 'Internal server error',
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
            message: 'Email atau password salah',
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
            message: 'Email atau password salah',
          })
          .code(401);
      }

      // Generate JWT token
      const jwtToken = token.generate(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '24h',
        }
      );

      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.created_at,
        updateAt: user.updated_at,
      };

      return h
        .response({
          status: 'success',
          message: 'Berhasil Login',
          data: {
            user: userData,
            jwtToken,
          },
        })
        .code(200);

    } catch (error) {
      console.error(error);
      return h.response({
        status: 'error',
        message: 'Internal server error'
      }).code(500);
    }
  },

  async getProfile(request, h) {
    try {
      const userId = request.auth.credentials.id;

      const [users] = await db.query(
        'SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?',
        [userId]
      );

      if (users.length === 0) {
        return h.response({
          status: 'error',
          message: 'Pengguna tidak ditemukan'
        }).code(404);
      }

      return h.response({
        status: 'success',
        message: 'Profile pengguna',
        data: {
          user: users[0]
        },
      }).code(200);

    } catch (error) {
      console.error(error);
      return h.response({
        status: 'error',
        message: 'Internal server error'
      }).code(500);
    }
  },

  async changePassword(request, h) {
    try {
      const { email, password, passConfirmation } = request.payload;

      // validasi password confirmation
      if (password !== passConfirmation) {
        return h.response({
          status: 'error',
          message: 'Password dan konfirmasi password tidak sesuai'
        }).code(400);
      }

      // mendapatkan user melalui email
      const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (users.length === 0) {
        return h.response({
          status: 'error',
          message: 'Email tidak ditemukan'
        }).code(404);
      }

      // hash password baru
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // update password
      await db.query(
        'UPDATE  users SET password = ? WHERE email = ?',
        [hashedPassword, email]
      );
      return h.response({
        status: 'success',
        message: 'Update password berhasil',
        data: 'null'
      }).code(200);

    } catch (error) {
      console.error(error);
      return h.response({
        status: 'error',
        message: 'Internal server error'
      }).code(500);
    }
  },

  async changeNameProfile(request, h) {
    try {
      const userId = request.auth.credentials.id;
      const { name } = request.payload;

      // Update nama pengguna
      await db.query(
        'UPDATE users SET name = ? WHERE id = ?',
        [name, userId]
      );

      // Mendapatkan update data pengguna
      const [users] = await db.query(
        'SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?',
        [userId]
      );

      return h.response({
        status: 'succes',
        message: 'Profile berhasil diperbarui',
        data: {
          user: users[0]
        },
      }).code(200);

    } catch (error) {
      console.error(error);
      return h.response({
        status: 'error',
        message: 'Internal server error'
      }).code(500);
    }
  },

  async changeEmailProfile(request, h) {
    try {
      const userId = request.auth.credentials.id;
      const { email, password } = request.payload;

      // Mendapatkan data pengguna saat ini
      const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
      if (users.length === 0) {
        return h.response({
          status: 'error',
          message: 'Pengguna tidak ditemukan'
        }).code(404);
      }

      // Verifikasi password
      const isValid = await bcrypt.compare(password, users[0].password);
      if (!isValid) {
        return h.response({
          status: 'error',
          message: 'Password salah'
        }).code(401);
      }

      //Check jika email sudah tersedia
      const [existing] = await db.query('SELECT id FROM users WHERE email = ? AND id != ?', [email, userId]);
      if (existing.length > 0) {
        return h.response({
          status: 'error',
          message: 'Email sudah digunakan'
        }).code(400);
      }

      // Update email pengguna
      await db.query(
        'UPDATE users SET email = ? WHERE id = ?',
        [email, userId]
      );

      // Mendapatkan update data pengguna
      const [updatedUser] = await db.query(
        'SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?', [userId]
      );

      return h.response({
        status: 'succes',
        message: 'Email berhasil diperbarui',
        data: {
          user: updatedUser[0]
        },
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


