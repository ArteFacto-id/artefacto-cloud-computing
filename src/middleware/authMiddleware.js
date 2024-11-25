const jwt = require('@hapi/jwt');

module.exports = {
  validateToken: async (request, h) => {
    try {
      if (!request.headers.authorization) {
        return h.response({ error: 'No token provided' })
          .code(401)
          .takeover();
      }

      const token = request.headers.authorization.replace('Bearer ', '');

      try {
        const decoded = jwt.token.decode(token);
        jwt.token.verify(decoded, process.env.JWT_SECRET);

        request.auth = {
          credentials: {
            userId: decoded.decoded.payload.userId,
            username: decoded.decoded.payload.username
          }
        };
        return h.continue;

      } catch (erorr) {
        return h.response({ error: 'Invalid token' })
          .code(401)
          .takeover();
      }
    } catch (error) {
      console.error(error);
      return h.response({ error: 'Internal server serror' })
        .code(500)
        .code();

    }
  }
};