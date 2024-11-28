const jwt = require('@hapi/jwt');

const validateToken = async (request, h) => {
  try {
    if (!request.headers.authorization) {
      return h.response({
        status: 'error',
        message: 'Token tidak ditemukan'
      })
        .code(401)
        .takeover();
    }

    const token = request.headers.authorization.replace('Bearer', '');

    try {
      const decoded = jwt.token.decode(token);
      jwt.token.verify(decoded, process.env.JWT_SECRET);

      request.auth = {
        credentials: {
          id: decoded.decoded.payload.id,
          email: decoded.decoded.payload.email
        }
      };

      return h.continue;

    } catch (erorr) {
      return h.response({
        status: 'error',
        message: 'Token tidak valid'
      })
        .code(401)
        .takeover();
    }
  } catch (error) {
    console.error(error);
    return h.response({
      status: 'error',
      message: 'Internal server serror'
    })
      .code(500)
      .takeover();

  }
};

module.exports = validateToken;