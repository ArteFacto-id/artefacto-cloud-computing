const authHandler = require('../handlers/authHandler');
const validateToken = require('../middleware/authMiddleware');
const { registerSchema, loginSchema } = require('../schema/schema');

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