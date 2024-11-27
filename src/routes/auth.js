const authController = require('../handlers/authHandler');
const authMiddleware = require('../middleware/authMiddleware');
const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Nama tidak boleh kosong',
    'any.required': 'Nama wajib diisi'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Format email tidak valid',
    'string.empty': 'Email tidak boleh kosong',
    'any.required': 'Email wajib diisi'
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password minimal 8 karakter',
    'string.empty': 'Password tidak boleh kosong',
    'any.required': 'Password wajib diisi'
  }),
  passConfirmation: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Konfirmasi password tidak cocok',
    'string.empty': 'Konfirmasi password tidak boleh kosong',
    'any.required': 'Konfirmasi password wajib diisi'
  })
});

const passwordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = [
  {
    method: 'POST',
    path: '/auth/register',
    handler: authController.register,
    options: {
      validate: {
        payload: registerSchema
      }
    }
  },
  {
    method: 'POST',
    path: '/auth/login',
    handler: authController.login,
    options: {
      validate: {
        payload: loginSchema
      }
    }
  }
  // {
  //   method: 'GET',
  //   path: '/auth/profile',
  //   handler: authController.getProfile,
  //   options: {
  //     pre: [{ method: authMiddleware.validateToken }]
  //   }
  // },
  // {
  //   method: 'PUT',
  //   path: '/auth/change-password',
  //   handler: authController.changePassword,
  //   options: {
  //     pre: [{ method: authMiddleware.validateToken }],
  //     validate: {
  //       payload: passwordSchema
  //     }
  //   }
  // }
];