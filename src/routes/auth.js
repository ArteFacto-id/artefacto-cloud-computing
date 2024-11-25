const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(8).required()
});

const passwordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).required()
});

module.exports = [
  {
    method: 'POST',
    path: '/auth/register',
    handler: authController.register,
    options: {
      validate: {
        payload: userSchema
      }
    }
  },
  {
    method: 'POST',
    path: '/auth/login',
    handler: authController.login,
    options: {
      validate: {
        payload: userSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/auth/profile',
    handler: authController.getProfile,
    options: {
      pre: [{ method: authMiddleware.validateToken }]
    }
  },
  {
    method: 'PUT',
    path: '/auth/change-password',
    handler: authController.changePassword,
    options: {
      pre: [{ method: authMiddleware.validateToken }],
      validate: {
        payload: passwordSchema
      }
    }
  }
];