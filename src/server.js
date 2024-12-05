const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const validateToken = require('./middleware/authMiddleware');
require('dotenv').config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.DB_HOST,
    routes: {
      cors: true
    }
  });

  // mengecualikan register dan login
  server.ext('onPreHandler', async (request, h) => {
    if (request.path === '/auth/register' || request.path === '/auth/login') {
      return h.continue;
    }

    return validateToken(request, h);
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();