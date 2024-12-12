const { token } = require('@hapi/jwt');

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

    const jwtToken = request.headers.authorization.replace('Bearer ', '');

    try {
      const decoded = token.decode(jwtToken);
      // menguraikan payload
      const payload = decoded.decoded.payload;

      // verifikasi token
      token.verify(decoded, process.env.JWT_SECRET);

      // set credentials
      request.auth = {
        credentials: {
          id: payload.id,
          email: payload.email,
        },
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