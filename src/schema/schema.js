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

const createTransactionSchema = Joi.object({
  ticketId: Joi.number().required().messages({
    'number.base': 'ID tiket harus berupa angka',
    'any.required': 'ID tiket wajib diisi'
  }),
  validDate: Joi.date().min('now').required().messages({
    'date.base': 'Tanggal tidak valid',
    'date.min': 'Tanggal tidak boleh kurang dari hari ini',
    'any.required': 'Tanggal wajib diisi'
  }),
  ticketQuantity: Joi.number().min(1).required().messages({
    'number.base': 'Jumlah tiket harus berupa angka',
    'number.min': 'Jumlah tiket minimal 1',
    'any.required': 'Jumlah tiket wajib diisi'
  }),
  paymentMethod: Joi.string().valid('bank_transfer', 'credit_card', 'e_wallet').required().messages({
    'string.base': 'Metode pembayaran tidak valid',
    'any.only': 'Metode pembayaran tidak valid',
    'any.required': 'Metode pembayaran wajib diisi'
  })
});



module.exports = {
  registerSchema,
  loginSchema,
  resetPasswordSchema,
  updateProfileSchema,
  updateEmailSchema,
  createTransactionSchema
};