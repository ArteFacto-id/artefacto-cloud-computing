const { options } = require('joi');
const authHandler = require('../handlers/authHandler');
const validateToken = require('../middleware/authMiddleware');
const { registerSchema, loginSchema, resetPasswordSchema, updateProfileSchema, updateEmailSchema } = require('../schema/schema');

module.exports = [
  {
    method: 'POST',
    path: '/auth/register',
    handler: authHandler.register,
    options: {
      validate: {
        payload: registerSchema
      }
    }
  },
  {
    method: 'POST',
    path: '/auth/login',
    handler: authHandler.login,
    options: {
      validate: {
        payload: loginSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/auth/profile',
    handler: authHandler.getProfile,
    options: {
      pre: [{ method: validateToken }]
    }
  },
  {
    method: 'PUT',
    path: '/auth/changePassword',
    handler: authHandler.changePassword,
    options: {
      pre: [{ method: validateToken }],
      validate: {
        payload: resetPasswordSchema
      }
    }
  },
  {
    method: 'PUT',
    path: '/auth/profile/changeName',
    handler: authHandler.changeNameProfile,
    options: {
      pre: [{ method: validateToken }],
      validate: {
        payload: updateProfileSchema
      }
    }
  },
  {
    method: 'PUT',
    path: '/auth/profile/changeEmail',
    handler: authHandler.changeEmailProfile,
    options: {
      pre: [{ method: validateToken }],
      validate: {
        payload: updateEmailSchema
      }
    }
  }
];