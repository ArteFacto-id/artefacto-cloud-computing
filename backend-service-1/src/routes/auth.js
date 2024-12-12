const authHandler = require('../handlers/authHandler');
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
  },
  {
    method: 'PUT',
    path: '/auth/changePassword',
    handler: authHandler.changePassword,
    options: {
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
      validate: {
        payload: updateEmailSchema
      }
    }
  }
];