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

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Fromat email tidak valid',
    'string.empty': 'Email tidak boleh kosong',
    'any.required': 'Email wajib diisi'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password tidak boleh kosong',
    'any.required': 'Password wajib diisi'
  })
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Format email tidak valid',
    'string.empty': 'Email tidak boleh kosong',
    'any.required': 'Email wajib diisi'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password tidak boleh kosong',
    'any.required': 'Password wajib diisi'
  }),
  newPassword: Joi.string().min(8).required().messages({
    'string.min': 'Password minimal 8 karakter',
    'string.empty': 'Email tidak boleh kosong',
    'any.required': 'Password wajib diisi'
  }),
  passConfirmation: Joi.string().required().valid(Joi.ref('newPassword')).messages({
    'any.only': 'Konfirmasi password tidak cocok',
    'string.empty': 'Konfirmasi password tidak boleh kosong',
    'any.required': 'Konfirmasi password wajib diisi'
  })
});

const updateProfileSchema = Joi.object({
  newName: Joi.string().required().messages({
    'string.empty': 'Nama tidak boleh kosong',
    'any.required': 'Nama wajib diisi'
  })
});

const updateEmailSchema = Joi.object({
  newEmail: Joi.string().email().required().messages({
    'string.eamil': 'Format email tidak valid',
    'string.empty': 'Email tidak boleh kosong',
    'any.required': 'Email wajib diisi'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password tidak boleh kosong',
    'any.required': 'Password wajib diisi'
  })
});



module.exports = {
  registerSchema,
  loginSchema,
  resetPasswordSchema,
  updateProfileSchema,
  updateEmailSchema
};